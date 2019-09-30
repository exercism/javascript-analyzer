import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";
import { Node, Statement } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { extractExport } from "~src/analyzers/utils/extract_export";
import { extractMainBody, MainBody } from "~src/analyzers/utils/extract_main_body";
import { extractMainMethod, MainMethod } from "~src/analyzers/utils/extract_main_method";
import { parameterName } from "~src/analyzers/utils/extract_parameter";
import { findTopLevelConstants, ProgramConstant, ProgramConstants } from "~src/analyzers/utils/find_top_level_constants";
import { isCallExpression } from "~src/analyzers/utils/is_call_expression";
import { isIdentifier } from "~src/analyzers/utils/is_identifier";
import { isLiteral } from "~src/analyzers/utils/is_literal";
import { NoExportError } from "~src/errors/NoExportError";
import { NoMethodError } from "~src/errors/NoMethodError";
import { getProcessLogger } from "~src/utils/logger";
import { Source } from "../SourceImpl";
import { findFirst } from "../utils/find_first";
import { isMemberExpression } from "../utils/is_member_expression";


type Program = TSESTree.Program
type Parameter = TSESTree.Parameter
type Expression = TSESTree.Expression

type MainExport = ReturnType<typeof extractExport>

const EXPECTED_METHOD = 'colorCode'
const EXPECTED_EXPORT_METHOD = 'colorCode'
const EXPECTED_CONSTANT = 'COLORS'
const EXPECTED_EXPORT_CONSTANT = 'COLORS'

class Constant {
  public readonly name: string
  public readonly signature: string;

  constructor(private readonly constant: Readonly<ProgramConstant>, source: Source) {
    this.name = (constant && isIdentifier(constant.id) && constant.id.name) || '<NO-CONSTANT-NAME>'
    this.signature = source.getOuter(constant.parent || constant)
  }

  public get kind(): ProgramConstant['kind'] {
    return this.constant.kind
  }

  public get isOfKindConst(): boolean {
    return this.kind === 'const'
  }

  public get isOptimalArray(): boolean {
    const { init } = this.constant

    if (!init) {
      return false
    }

    const literals = [
      "black",
      "brown",
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "violet",
      "grey",
      "white"
    ];

    if (init.type === AST_NODE_TYPES.ArrayExpression) {
      // Each literal needs to be present, and needs to be present exactly in this order
      return init.elements.every((value, index): boolean => isLiteral(value, literals[index]))
    }

    return false
  }

  public get isObjectToArray(): boolean {
    const { init } = this.constant

    if (!init) {
      return false
    }

    if (!isCallExpression(init, 'Object', 'keys')) {
      return false
    }

    const [argument, second] = init.arguments

    // TODO: check that referenced object is optimal
    return !second && isIdentifier(argument)
  }

  public isOptimalObject(node: ProgramConstant | undefined): boolean {
    if (!node || !node.init) {
      return false
    }

    if (node.init.type !== AST_NODE_TYPES.ObjectExpression) {
      return false
    }

    const keys = [
      "black",
      "brown",
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "violet",
      "grey",
      "white"
    ]

    return node.init.properties.every((property, index): boolean => {
      return property.type === AST_NODE_TYPES.Property &&
        isLiteral(property.key, keys[index]) &&
        isLiteral(property.value, index)
    })
  }

  /**
   * In the case that the top-level constant is constructed from Object.keys(argument),
   * this property holds the name of the "argument".
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof Constant
   */
  public get referencedSourceObjectName(): string | undefined {
    const { init } = this.constant

    if (!init || !isCallExpression(init, 'Object', 'keys')) {
      return undefined
    }

    const [argument, second] = init.arguments

    if (second || !isIdentifier(argument)) {
      return undefined
    }

    return argument.name
  }

  public isOptimal(constants: ProgramConstants): boolean {
    return this.isOfKindConst && (
      this.isOptimalArray
      || (this.isObjectToArray && this.isOptimalObject(this.getReferencedObject(constants)))
    )
  }

  private getReferencedObject(constants: ProgramConstants): ProgramConstant | undefined {
    const name = this.referencedSourceObjectName
    return constants.find((constant): boolean => constant && isIdentifier(constant.id) && constant.id.name === name)
  }

}

class Entry {
  public readonly name: string
  public readonly signature: string

  private readonly params: readonly Parameter[];
  private readonly body: MainBody;

  constructor(method: Readonly<NonNullable<MainMethod>>, source: Readonly<Source>) {
    this.name = (method && method.id && method.id.name) || EXPECTED_METHOD
    this.params = method.params
    this.body = extractMainBody(method)

    this.signature = source.getOuter(method.parent || method)
  }

  public get hasAtLeastOneParameter(): boolean {
    return this.params.length > 0
  }

  public get hasExactlyOneParameter(): boolean {
    return this.params.length === 1
  }

  public get hasSimpleParameter(): boolean {
    return isIdentifier(this.params[0])
  }

  public get parameterType(): Parameter['type'] {
    return this.params[0].type
  }

  public get parameterName(): string {
    return parameterName(this.params[0])
  }

  public get hasFindIndex(): boolean {
    return findFirst(this.body, (node) => isCallExpression(node, undefined, 'findIndex')) !== undefined
  }

  public get hasForEach(): boolean {
    return findFirst(this.body, (node) => isCallExpression(node, undefined, 'forEach')) !== undefined
  }

  public get hasFor(): boolean {
    return findFirst(this.body, (node) => [
      AST_NODE_TYPES.ForInStatement,
      AST_NODE_TYPES.ForOfStatement,
      AST_NODE_TYPES.ForStatement
    ].some((type) => type === node.type)
    ) !== undefined
  }

  public get hasIncludes(): boolean {
    return findFirst(this.body, (node) => isCallExpression(node, undefined, 'includes')) !== undefined
  }

  public get hasToLowerCase(): boolean {
    return findFirst(this.body, (node) => isCallExpression(node, undefined, 'toLowerCase')) !== undefined
  }

  public isOptimal(constant: Readonly<Constant> | undefined): boolean {
    const logger = getProcessLogger()
    const mainBody: MainBody & { argument?: Statement | Expression | null } = { ...this.body }

    // If is not a simple return
    //
    if(mainBody.type !== AST_NODE_TYPES.ReturnStatement) {
      if (mainBody.type !== AST_NODE_TYPES.BlockStatement) {
        logger.log(`~> body type is: ${(mainBody as unknown as { type: string }).type}`)
        return false
      }

      const finalStatement = mainBody.body.reverse()[0]

      if (finalStatement.type !== AST_NODE_TYPES.ReturnStatement) {
        logger.log(`~> body type is a block with the final statement type: ${finalStatement.type}`)
        return false
      }

      mainBody.argument = finalStatement.argument
    }

    if (!constant) {
      logger.log('~> constant not found')
      return false
    }

    if (!mainBody.argument) {
      logger.log('~> no main body to process')
      return false
    }

    return this.isOptimalHelper(mainBody.argument, constant)
  }

  public isOptimalHelper(func: Node, constant: Readonly<Constant>): boolean {
    const logger = getProcessLogger()

    let body: Node | null

    switch(func.type) {
      case AST_NODE_TYPES.BlockStatement: {
        body = func.body[0]
        break;
      }
      case AST_NODE_TYPES.ReturnStatement: {
        body = func.argument
        break;
      }
      case AST_NODE_TYPES.CallExpression: {
        body = func
        break;
      }
      case AST_NODE_TYPES.MemberExpression: {
        body = func
        break;
      }
      default: {
        logger.log(`~> the helper type ${func.type} is not processable`)
        return false
      }
    }

    if (!body) {
      return false
    }

    if (constant.isOptimalArray) {
      logger.log('=> constant is optimal array')

      // Only looking for:
      //
      // COLORS.indexOf(param)
      return isCallExpression(body, constant.name, 'indexOf')
        && this.params.length === 1
        && isIdentifier(this.params[0])
        && body.arguments.length === 1
        && isIdentifier(body.arguments[0], this.parameterName)
        || false
    }

    if (constant.isOptimalObject) {
      logger.log('=> constant is optimal object')

      // Only looking for:
      //
      // REF_COLORS[param]
      return this.params.length === 1
        && isIdentifier(this.params[0])
        && constant.referencedSourceObjectName
        && isMemberExpression(body, constant.referencedSourceObjectName, this.parameterName)
        && body.computed
        || false
    }

    logger.log(`~> constant is not optimal`)

    return false
  }
}

export class ResistorColorSolution {
  public readonly source: Source;

  private mainMethod: Entry
  private mainExports: {
    function: [NonNullable<MainExport[0]>, MainExport[1]];
    constant: [NonNullable<MainExport[0]>, MainExport[1]];
  }
  private fileConstants: ProgramConstants
  private mainConstant: Constant | undefined;

  constructor(public readonly program: Program, source: string) {
    this.source = new Source(source)

    this.mainMethod = ensureExists(extractMainMethod(program, EXPECTED_METHOD), this.source)

    this.mainExports = {
      function: ensureExported(extractExport(program, EXPECTED_EXPORT_METHOD), EXPECTED_EXPORT_METHOD),
      constant: ensureExported(extractExport(program, EXPECTED_EXPORT_CONSTANT), EXPECTED_EXPORT_CONSTANT)
    }

    // All constants at the top level that are _not_ the main method
    this.fileConstants = findTopLevelConstants(program, ['let', 'const', 'var'])
      .filter((declaration): boolean => declaration && isIdentifier(declaration.id) && declaration.id.name !== EXPECTED_METHOD)

    // Find expected name
    const expectedConstant = this.fileConstants.find((constant) => isIdentifier(constant.id, EXPECTED_CONSTANT)) ||
      // Or find the first array or object assignment
      this.fileConstants.find((constant) => constant.init && [AST_NODE_TYPES.ArrayExpression, AST_NODE_TYPES.ObjectExpression].indexOf(constant.init.type) === -1)

    this.mainConstant = expectedConstant && new Constant(expectedConstant, this.source) || undefined
  }

  public get entry(): Readonly<Entry> {
    return this.mainMethod
  }

  public get constant(): Readonly<Constant> {
    return this.mainConstant!
  }

  public get hasOptimalEntry(): boolean {
    return this.entry.isOptimal(this.mainConstant)
  }

  public get areFileConstantsConst(): boolean  {
    // const foo;
    // => kind: "const"
    //
    // let foo;
    // => kind: "let"
    //
    // var foo;
    // => kind: "var"
    //
    return this.fileConstants.every((declaration): boolean => declaration.kind === 'const')
  }

  public get hasInlineExports(): boolean {
    // export function value
    // => no specififers
    //
    // export { value }
    // => yes specififers
    //
    return (!this.mainExports.function[0].specifiers || this.mainExports.function[0].specifiers.length === 0)
      && (!this.mainExports.constant[0].specifiers || this.mainExports.constant[0].specifiers.length === 0)
  }

  public isOptimal(): boolean {
    return this.hasOptimalEntry
  }
}

function ensureExists(method: MainMethod<typeof EXPECTED_METHOD> | undefined, source: Source): Entry {
  if (typeof method === 'undefined') {
    throw new NoMethodError(EXPECTED_METHOD)
  }
  return new Entry(method, source)
}

function ensureExported([declaration, node]: MainExport, name: string): [NonNullable<MainExport[0]>, MainExport[1]] {
  if (typeof declaration === 'undefined') {
    throw new NoExportError(name)
  }
  return [declaration, node]
}

function findMethod<M extends string>(program: Program, method: M): MainMethod<M> | undefined {
  return extractMainMethod(program, method)
}
