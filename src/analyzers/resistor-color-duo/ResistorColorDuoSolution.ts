import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";
import { Statement, Node } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";

import { extractExport } from "~src/analyzers/utils/extract_export";
import { extractMainBody, MainBody } from "~src/analyzers/utils/extract_main_body";
import { extractMainMethod, MainMethod } from "~src/analyzers/utils/extract_main_method";
import { parameterName } from "~src/analyzers/utils/extract_parameter";
import { findFirst } from "~src/analyzers/utils/find_first";
import { findMemberCall } from "~src/analyzers/utils/find_member_call";
import { isNewExpression } from "~src/analyzers/utils/find_new_expression";
import { findTopLevelConstants, ProgramConstant, ProgramConstants } from "~src/analyzers/utils/find_top_level_constants";
import { isBinaryExpression } from "~src/analyzers/utils/is_binary_expression";
import { isCallExpression } from "~src/analyzers/utils/is_call_expression";
import { isIdentifier } from "~src/analyzers/utils/is_identifier";
import { isLiteral } from "~src/analyzers/utils/is_literal";
import { NoExportError } from "~src/errors/NoExportError";
import { NoMethodError } from "~src/errors/NoMethodError";
import { getProcessLogger } from "~src/utils/logger";
import { Source } from "../SourceImpl";

type Program = TSESTree.Program
type Parameter = TSESTree.Parameter
type Expression = TSESTree.Expression

type MainExport = ReturnType<typeof extractExport>

const EXPECTED_METHOD = 'value'
const EXPECTED_EXPORT = 'value'

class Constant {
  public readonly name: string

  constructor(private readonly constant: Readonly<ProgramConstant>) {
    this.name = (isIdentifier(constant.id) && constant.id.name) || '<NO-CONSTANT-NAME>'
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
    return constants.find((constant): boolean => isIdentifier(constant.id) && constant.id.name === name)
  }

}

class Entry {
  public readonly name: string
  public readonly signature: string

  private readonly params: readonly Parameter[];
  private readonly body: MainBody;

  constructor(method: Readonly<NonNullable<MainMethod>>, source: Readonly<Source>) {
    this.name = (method.id && method.id.name) || EXPECTED_METHOD
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

  public get hasOptimalParameter(): boolean {
    const [param] = this.params
    return param.type === AST_NODE_TYPES.ArrayPattern
      && param.elements.length === 2
      && isIdentifier(param.elements[0])
      && isIdentifier(param.elements[1])
  }

  public get parameterType(): Parameter['type'] {
    return this.params[0].type
  }

  public get parameterName(): string {
    return parameterName(this.params[0])
  }

  public isOptimal(): boolean {
    const logger = getProcessLogger()
    const mainBody: MainBody & { argument?: Statement | Expression | null } = { ...this.body }

    // If the argument is not optimal with destructuring
    //
    if (!this.hasOptimalParameter) {
      logger.log('~> parameter is not optimal')
      return false
    }

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

    // If we got here, it knows it's a return statement
    //
    // return ...
    //

    const { argument } = mainBody
    if (!argument || !isBinaryExpression(argument, '+')) {
      logger.log(`~> argument is not a + b: ${JSON.stringify(argument, null, 2)}`)
      return false
    }

    // If we got here, it knows it's a binary expression of +
    //
    // return x + y
    //

    const { left, right } = argument

    // This will always be true, but we need to help TS
    const [param] = this.params
    if (param.type !== AST_NODE_TYPES.ArrayPattern || param.elements.length !== 2) {
      logger.log('~> parameter is not optimal (dup)')
      return false
    }

    const [tens, ones] = param.elements
    const tensName = isIdentifier(tens) && tens.name
    const onesName = isIdentifier(ones) && ones.name

    if (!tensName || !onesName) {
      logger.log('~> one of the parameters is not a valid identifier')
      return false
    }

    const leftContainsHelper = left.type === AST_NODE_TYPES.CallExpression && isIdentifier(left.callee) && left.arguments.length === 1
    const rightContainsHelper = right.type === AST_NODE_TYPES.CallExpression && isIdentifier(right.callee) && right.arguments.length === 1

    if (!leftContainsHelper && !rightContainsHelper) {
      logger.log('~> no helper method expression found')
      return false
    }

    const helperMethodName =
      (left.type === AST_NODE_TYPES.CallExpression && isIdentifier(left.callee) && left.callee.name)
      || (right.type === AST_NODE_TYPES.CallExpression && isIdentifier(right.callee) && right.callee.name)
      || undefined

    if (!helperMethodName) {
      return false
    }

    // colorCode(ones) + a * b
    if (
      isCallExpression(left, helperMethodName)
      && left.arguments.length === 1
      && isIdentifier(left.arguments[0], onesName)
      && isBinaryExpression(right, '*')
    ) {
      const { left: innerLeft, right: innerRight } = right

      // colorCode(ones) + colorCode(tens) * 10
      if (
        isCallExpression(innerLeft, helperMethodName)
        && innerLeft.arguments.length === 1
        && isIdentifier(innerLeft.arguments[0], tensName)
        && isLiteral(innerRight, 10)
      ) {
        return true
      }

      // colorCode(ones) + 10 * colorCode(tens)
      return isCallExpression(innerRight, helperMethodName)
        && innerRight.arguments.length === 1
        && isIdentifier(innerRight.arguments[0], tensName)
        && isLiteral(innerLeft, 10)
    }

    // a * b + colorCode(ones)
    if (
      isCallExpression(right, helperMethodName)
      && right.arguments.length === 1
      && isIdentifier(right.arguments[0], onesName)
      && isBinaryExpression(left, '*')
    ) {
      const { left: innerLeft, right: innerRight } = left

      // colorCode(tens) * 10 + colorCode(ones)
      if (
        isCallExpression(innerLeft, helperMethodName)
        && innerLeft.arguments.length === 1
        && isIdentifier(innerLeft.arguments[0], tensName)
        && isLiteral(innerRight, 10)
      ) {
        return true
      }

      // 10 * colorCode(tens) + colorCode(ones)
      return isCallExpression(innerRight, helperMethodName)
        && innerRight.arguments.length === 1
        && isIdentifier(innerRight.arguments[0], tensName)
        && isLiteral(innerLeft, 10)
    }

    return false
  }
}

export class ResistorColorDuoSolution {
  public readonly source: Source;

  private mainMethod: Entry
  private mainExport: [NonNullable<MainExport[0]>, MainExport[1]]
  private fileConstants: ProgramConstants

  constructor(public readonly program: Program, source: string) {
    this.source = new Source(source)

    this.mainMethod = ensureExists(extractMainMethod(program, EXPECTED_METHOD), this.source)
    this.mainExport = ensureExported(extractExport(program, EXPECTED_EXPORT))

    // All constants at the top level that are _not_ the main method
    this.fileConstants = findTopLevelConstants(program, ['let', 'const', 'var'])
      .filter((declaration): boolean => isIdentifier(declaration.id) && declaration.id.name !== EXPECTED_METHOD)
  }

  public get entry(): Readonly<Entry> {
    return this.mainMethod
  }

  public get hasOneConstant(): boolean  {
    return this.fileConstants.length === 1
  }

  public get hasOptimalEntry(): boolean {
    return this.entry.isOptimal()
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

  public get hasInlineExport(): boolean {
    // export function gigasecond
    // => no specififers
    //
    // export { gigasecond }
    // => yes specififers
    //
    return !this.mainExport[0].specifiers || this.mainExport[0].specifiers.length === 0
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

function ensureExported([declaration, node]: MainExport): [NonNullable<MainExport[0]>, MainExport[1]] {
  if (typeof declaration === 'undefined') {
    throw new NoExportError(EXPECTED_EXPORT)
  }
  return [declaration, node]
}
