import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";

import { extractExport } from "~src/analyzers/utils/extract_export";
import { extractMainBody, MainBody } from "~src/analyzers/utils/extract_main_body";
import { extractMainMethod, MainMethod } from "~src/analyzers/utils/extract_main_method";
import { parameterName } from "~src/analyzers/utils/extract_parameter";
import { findFirst } from "~src/analyzers/utils/find_first";
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
import { ReturnStatement, Statement } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";


type Program = TSESTree.Program
type Parameter = TSESTree.Parameter
type Expression = TSESTree.Expression
type LargeNumberComprehension =
  TSESTree.AssignmentExpression
  | TSESTree.AssignmentPattern
  | TSESTree.BinaryExpression
  | TSESTree.CallExpression
  | TSESTree.ExpressionStatement
  | TSESTree.Literal
  | TSESTree.VariableDeclarator

type MainExport = ReturnType<typeof extractExport>

const EXPECTED_METHOD = 'gigasecond'
const EXPECTED_EXPORT = 'gigasecond'

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

  public get parameterType(): Parameter['type'] {
    return this.params[0].type
  }

  public get parameterName(): string {
    return parameterName(this.params[0])
  }

  public isOptimal(constant?: Readonly<Constant>, comprehension?: Readonly<LargeNumberComprehension>): boolean {
    const logger = getProcessLogger()
    const mainBody: MainBody & { argument?: Statement | Expression | null } = { ...this.body }

    // If is not a simple return
    //
    if(mainBody.type !== AST_NODE_TYPES.ReturnStatement) {
      if (comprehension === undefined || mainBody.type !== AST_NODE_TYPES.BlockStatement) {
        logger.log(`~> body type is: ${mainBody.type}`)
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
    if (!argument || !isNewExpression(argument, 'Date')) {
      logger.log(`~> argument is not new XXX: ${JSON.stringify(argument, null, 2)}`)
      return false
    }

    // If we got here, it knows it's a new expression of Date
    //
    // return new Date(...)
    //

    const { arguments: newDateParams } = argument

    // Make sure we're passing a single binary expression
    if (newDateParams.length !== 1) {
      logger.log(`~> there are ${newDateParams.length} parameters`)
      return false
    }

    const [expression] = newDateParams
    if (!isBinaryExpression(expression, '+')) {
      logger.log(`~> expression is ${expression.type}`)
      return false
    }

    if (!constant && !comprehension) {
      logger.log(`~> doesn't have a top-level constant and no comprehension`)
      return false
    }

    // If we got here, it knows it's a binary expression as parameter
    //
    // return new Date(a + b)
    //

    if (comprehension && comprehension.type == AST_NODE_TYPES.VariableDeclarator) {
      // Don't care about the kind because _there is no constant_. In that sense
      // it will not take into account the kind of the constant here.
      constant = new Constant({ ...comprehension, kind: 'const' })

      logger.log(`~> the comprehension is a constant`)
    }

    // One of the two sides needs to be the argument.getTime call
    //
    const callExpression = isCallExpression(expression.left, this.parameterName, 'getTime')
      ? expression.left
      : isCallExpression(expression.right, this.parameterName, 'getTime') && expression.right

    // One of the two sides needs to be the top-level constant or comprehension
    //
    if (constant) {
      const identifier = isIdentifier(expression.left, constant.name)
        ? expression.left
        : isIdentifier(expression.right, constant.name) && expression.right

      logger.log(`=> identifier: ${!!identifier}, expression: ${!!callExpression}`)
      return !!(callExpression && identifier)
    }

    // In this case the constant is just not extracted into the top-level, but
    // there is a comprehension.
    const comprehensionInExpression = expression.left === comprehension ||
      expression.right === comprehension

    return !!(callExpression && comprehensionInExpression)
  }

  public get hasMinimalAndOptimalCalls(): boolean {
    return false
  }
}

class Constant {
  public readonly name: string
  private _memoized: { [key: string]: string | number | boolean }

  constructor(private readonly constant: Readonly<ProgramConstant>) {
    this.name = (isIdentifier(constant.id) && constant.id.name) || '<NO-CONSTANT-NAME>'
    this._memoized = {}
  }

  public get kind(): ProgramConstant['kind'] {
    return this.constant.kind
  }

  public get isOfKindConst(): boolean {
    return this.kind === 'const'
  }

  public get isOptimisedExpression(): boolean {
    const { init } = this.constant

    if (!init) {
      return false
    }

    if ('isOptimisedExpression' in this._memoized) {
      return !!this._memoized['isOptimisedComprehension']
    }

    return this._memoized['isOptimisedComprehension'] = isOptimisedComprehension(init)
  }

  public get isLargeNumberLiteral(): boolean {
    const { init } = this.constant

    if (!init) {
      return false
    }

    if ('isLargeNumberLiteral' in this._memoized) {
      return !!this._memoized['isLargeNumberLiteral']
    }

    return this._memoized['isLargeNumberLiteral'] = isLargeNumberLiteral(init)
  }

  public isOptimal(): boolean {
    if ('isOptimal' in this._memoized) {
      return !!this._memoized['isOptimal']
    }

    const result = this.isOfKindConst && this.isOptimisedExpression
    this._memoized['isOptimal'] = result
    return result
  }

}

export class GigasecondSolution {
  public readonly source: Source;

  private mainMethod: Entry
  private mainExport: [NonNullable<MainExport[0]>, MainExport[1]]
  private fileConstants: ProgramConstants
  private mainConstant: Constant | undefined
  private largeNumberComprehension: LargeNumberComprehension | undefined;
  private largeNumberLiteral: LargeNumberComprehension | undefined;

  constructor(public readonly program: Program, source: string) {
    this.source = new Source(source)

    this.mainMethod = ensureExists(extractMainMethod(program, EXPECTED_METHOD), this.source)
    this.mainExport = ensureExported(extractExport(program, EXPECTED_EXPORT))

    // All constants at the top level that are _not_ the main method
    this.fileConstants = findTopLevelConstants(program, ['let', 'const', 'var'])
      .filter((declaration): boolean => isIdentifier(declaration.id) && declaration.id.name !== EXPECTED_METHOD)

    this.mainConstant = this.fileConstants.length > 0 && new Constant(this.fileConstants[0]) || undefined
    this.largeNumberComprehension = findNumberComprehension(program)
    this.largeNumberLiteral = findNumberLiteral(program)
  }

  public get entry(): Readonly<Entry> {
    return this.mainMethod
  }

  public get constant(): Readonly<Constant> | undefined {
    return this.mainConstant
  }

  public get numberComprehension(): Readonly<LargeNumberComprehension> | undefined {
    return this.largeNumberComprehension
  }

  public get numberLiteral(): Readonly<LargeNumberComprehension> | undefined {
    return this.largeNumberLiteral
  }

  public get hasOneConstant(): boolean  {
    return this.fileConstants.length === 1
  }

  public get hasOptimalConstant(): boolean  {
    return this.hasOneConstant && this.constant!.isOptimal()
  }

  public get hasOptimalEntry(): boolean {
    return this.entry.isOptimal(this.constant)
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
    return this.hasOptimalEntry && this.hasOptimalConstant
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

function findNumberComprehension(program: TSESTree.Node): LargeNumberComprehension | undefined {
  return findFirst(program, (node): boolean => {
    switch(node.type) {
      case AST_NODE_TYPES.AssignmentExpression:
        return isOptimisedComprehension(node.right)
      case AST_NODE_TYPES.AssignmentPattern:
        return node.right !== undefined && isOptimisedComprehension(node.right)
      case AST_NODE_TYPES.BinaryExpression:
        return isOptimisedComprehension(node)
      case AST_NODE_TYPES.CallExpression:
        return isOptimisedComprehension(node)
      case AST_NODE_TYPES.ExpressionStatement:
        return isOptimisedComprehension(node.expression)
      case AST_NODE_TYPES.Literal:
        return isOptimisedComprehension(node)
      case AST_NODE_TYPES.VariableDeclarator:
        return node.init !== null && isOptimisedComprehension(node.init)
      default:
        return false
    }
  }) as LargeNumberComprehension | undefined
}

function isOptimisedComprehension(expression: Expression): boolean {
  // 1e12
  if (isLiteral(expression, undefined, '1e12') || isLiteral(expression, undefined, '1E12')) {
    return true
  }

  // Math.pow(10, 12)
  if (
    isCallExpression(expression, 'Math', 'pow')
    && isLiteral(expression.arguments[0], 10)
    && isLiteral(expression.arguments[1], 12)
  ) {
    return true
  }

  // 10 ** 12
  if (
    isBinaryExpression(expression, '**')
    && isLiteral(expression.left, 10)
    && isLiteral(expression.right, 12)) {
    return true
  }

  // ◼ * ◼
  if (isBinaryExpression(expression, '*')) {
    // 1e9 * ◼
    // 10 ** 9 * ◼
    // Math.pow(10, 9) * ◼
    const isOptimisedGigasecondLeft =
         isLiteral(expression.left, undefined, '1e9')
      || isLiteral(expression.left, undefined, '1E9')
      || (isBinaryExpression(expression.left, '**') && isLiteral(expression.left.left, 10) && isLiteral(expression.left.right, 9))
      || (isCallExpression(expression.left, 'Math', 'pow') && isLiteral(expression.left.arguments[0], 10) && isLiteral(expression.left.arguments[1], 9))

    if (isOptimisedGigasecondLeft) {
      // ◼ * 1000
      // ◼ * 1e3
      return isLiteral(expression.right, 1000)
        || isLiteral(expression.right, undefined, '1e3')
        || isLiteral(expression.right, undefined, '1E3')
    }

    // ◼ * 1e9
    // ◼ * 10 ** 9
    // ◼ * Math.pow(10, 9)
    const isOptimisedGigasecondRight =
         isLiteral(expression.right, undefined, '1e9')
      || isLiteral(expression.right, undefined, '1E9')
      || (isBinaryExpression(expression.right, '**') && isLiteral(expression.right.left, 10) && isLiteral(expression.right.right, 9))
      || (isCallExpression(expression.right, 'Math', 'pow') && isLiteral(expression.right.arguments[0], 10) && isLiteral(expression.right.arguments[1], 9))

    // 1000 * ◼
    // 1e3 * ◼
    return isOptimisedGigasecondRight && (
      isLiteral(expression.left, 1000)
      || isLiteral(expression.left, undefined, '1e3')
      || isLiteral(expression.left, undefined, '1E3')
    )
  }

  // Math.pow(10, 12)
  if (
    isCallExpression(expression, 'Math', 'pow')
    && isLiteral(expression.arguments[0], 10)
    && isLiteral(expression.arguments[1], 12)
  ) {
    return true
  }

  // 10 ** 12
  if (
    isBinaryExpression(expression, '**')
    && isLiteral(expression.left, 10)
    && isLiteral(expression.right, 12)) {
    return true
  }

  const logger = getProcessLogger()
  logger.log(`~> expression (${expression.type}) is not an optimised comprehension`)
  // logger.log(JSON.stringify(expression, null, 2))
  return false
}

function findNumberLiteral(program: TSESTree.Node): LargeNumberComprehension | undefined {
  return findFirst(program, (node): boolean => {
    switch(node.type) {
      case AST_NODE_TYPES.AssignmentExpression:
        return isLargeNumberLiteral(node.right)
      case AST_NODE_TYPES.AssignmentPattern:
        return node.right !== undefined && isLargeNumberLiteral(node.right)
      case AST_NODE_TYPES.BinaryExpression:
        return isLargeNumberLiteral(node)
      case AST_NODE_TYPES.ExpressionStatement:
        return isLargeNumberLiteral(node.expression)
      case AST_NODE_TYPES.Literal:
        return isLargeNumberLiteral(node)
      case AST_NODE_TYPES.VariableDeclarator:
        return node.init !== null && isLargeNumberLiteral(node.init)
      default:
        return false
    }
  }) as LargeNumberComprehension | undefined
}

function isLargeNumberLiteral(node: TSESTree.Node): boolean {
  if (isLiteral(node, undefined, '1000000000000')) {
    return true
  }

  if (isBinaryExpression(node, '*') && (
  // 1000000000 * 1000
  // 1000 * 1000000000
  // 1000 * 1000 * 1000
    (isLiteral(node.left, 1000000000) && isLiteral(node.right, undefined, '1000'))
      || (isLiteral(node.left, undefined, '1000') && isLiteral(node.right, 1000000000))
      || (isBinaryExpression(node.left, '*') && isLiteral(node.right, undefined, '1000') && isLiteral(node.left.left, undefined, '1000') && isLiteral(node.left.right, undefined, '1000'))
  )) {
    return true
  }

  return false
}
