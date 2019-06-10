import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/typescript-estree"

import { extractMainMethod, MainMethod } from "~src/analyzers/utils/extract_main_method";
import { extractExport } from "~src/analyzers/utils/extract_export";
import { findTopLevelConstants, ProgramConstant, ProgramConstants } from "../utils/find_top_level_constants";
import { isIdentifier } from "../utils/is_identifier";
import { NoMethodError } from "~src/errors/NoMethodError";
import { NoExportError } from "~src/errors/NoExportError";
import { extractMainBody, MainBody } from "../utils/extract_main_body";
import { isNewExpression } from "../utils/find_new_expression";
import { isBinaryExpression } from "../utils/is_binary_expression";
import { isCallExpression } from "../utils/is_call_expression";
import { parameterName } from "../utils/extract_parameter";
import { isAssignmentPattern } from "../utils/is_assignment_pattern";
import { getProcessLogger } from "~src/utils/logger";
import { isLiteral } from "../utils/is_literal";

type Program = TSESTree.Program
type Parameter = TSESTree.Parameter
type Expression = TSESTree.Expression

type MainExport = ReturnType<typeof extractExport>

const EXPECTED_METHOD = 'gigasecond'
const EXPECTED_EXPORT = 'gigasecond'

export class GigasecondSolution {
  private mainMethod: Entry
  private mainExport: [NonNullable<MainExport[0]>, MainExport[1]]
  private fileConstants: ProgramConstants
  private mainConstant: Constant | undefined

  constructor(readonly program: Program) {
    this.mainMethod = ensureExists(extractMainMethod(program, EXPECTED_METHOD))
    this.mainExport = ensureExported(extractExport(program, EXPECTED_EXPORT))

    // All constants at the top level that are _not_ the main method
    this.fileConstants = findTopLevelConstants(program, ['let', 'const', 'var'])
      .filter((declaration) => isIdentifier(declaration.id) && declaration.id.name !== EXPECTED_METHOD)

    this.mainConstant = this.fileConstants.length > 0 && new Constant(this.fileConstants[0]) || undefined
  }

  get entry(): Readonly<Entry> {
    return this.mainMethod
  }

  get constant(): Readonly<Constant> | undefined {
    return this.mainConstant
  }

  get hasOneConstant(): boolean  {
    return this.fileConstants.length === 1
  }

  get hasOptimalConstant(): boolean  {
    return this.hasOneConstant && this.constant!.isOptimal()
  }

  get hasOptimalEntry(): boolean {
    return this.entry.isOptimal(this.constant)
  }

  get areFileConstantsConst(): boolean  {
    // const foo;
    // => kind: "const"
    //
    // let foo;
    // => kind: "let"
    //
    // var foo;
    // => kind: "var"
    //
    return this.fileConstants.every((declaration) => declaration.kind === 'const')
  }

  get hasInlineExport(): boolean {
    // export function gigasecond
    // => no specififers
    //
    // export { gigasecond }
    // => yes specififers
    //
    return !this.mainExport[0].specifiers || this.mainExport[0].specifiers.length === 0
  }

  isOptimal(): boolean {
    return this.hasOptimalEntry && this.hasOptimalConstant
  }
}

class Entry {
  public readonly name: string

  private readonly params: ReadonlyArray<Parameter>;
  private readonly body: MainBody;

  constructor(method: Readonly<NonNullable<MainMethod>>) {
    this.name = (method.id && method.id.name) || EXPECTED_METHOD
    this.params = method.params
    this.body = extractMainBody(method)
  }

  get hasAtLeastOneParameter(): boolean {
    return this.params.length > 0
  }

  get hasExactlyOneParameter(): boolean {
    return this.params.length === 1
  }

  get hasSimpleParameter(): boolean {
    return isIdentifier(this.params[0])
  }

  get parameterType(): Parameter['type'] {
    return this.params[0].type
  }

  get parameterName(): string {
    return parameterName(this.params[0])
  }

  isOptimal(constant?: Readonly<Constant>): boolean {
    const logger = getProcessLogger()

    // If is not a simple return
    //
    if(this.body.type !== AST_NODE_TYPES.ReturnStatement) {
      logger.log(`~> body type is: ${this.body.type}`)
      return false
    }

    // If we got here, it knows it's a return statement
    //
    // return ...
    //

    const { argument } = this.body
    if (!argument || !isNewExpression(argument, 'Date')) {
      logger.log(`~> argument is not new XXX: ${argument}`)
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

    if (!constant) {
      logger.log(`~> doesn't have a top-level constant`)
      return false
    }

    // If we got here, it knows it's a binary expression as parameter
    //
    // return new Date(a + b)
    //

    // One of the two sides needs to be the top-level constant
    //
    const identifier = isIdentifier(expression.left, constant.name)
      ? expression.left
      : isIdentifier(expression.right, constant.name) && expression.right

    // One of the two sides needs to be the argument.getTime call
    //
    const callExpression = isCallExpression(expression.left, this.parameterName, 'getTime')
      ? expression.left
      : isCallExpression(expression.right, this.parameterName, 'getTime') && expression.right

    logger.log(`=> identifier: ${!!identifier}, expression: ${!!callExpression}`)
    return !!(identifier && callExpression)
  }
}

class Constant {
  public readonly name: string
  private _memoized: { [key: string]: string | number | boolean }

  constructor(private readonly constant: Readonly<ProgramConstant>) {
    this.name = (isIdentifier(constant.id) && constant.id.name) || '<NO-CONSTANT-NAME>'
    this._memoized = {}
  }

  get kind(): ProgramConstant['kind'] {
    return this.constant.kind
  }

  get isOfKindConst(): boolean {
    return this.kind === 'const'
  }

  get isOptimisedLiteral(): boolean {
    return !!this.constant.init && isLiteral(this.constant.init, undefined, '1e12')
  }

  get isLargeNumberLiteral(): boolean {
    return !!this.constant.init && isLiteral(this.constant.init, 1000000000000)
  }

  get isOptimisedExpression(): boolean {
    const { init } = this.constant

    if (!init) {
      return false
    }

    if ('isOptimisedExpression' in this._memoized) {
      return !!this._memoized['isOptimisedComprehension']
    }

    return this._memoized['isOptimisedComprehension'] = isOptimisedComprehension(init)
  }

  isOptimal(): boolean {
    if ('isOptimal' in this._memoized) {
      return !!this._memoized['isOptimal']
    }

    const result = this.isOfKindConst && this.isOptimisedExpression
    this._memoized['isOptimal'] = result
    return result
  }

}

function ensureExists(method?: MainMethod<typeof EXPECTED_METHOD>): Entry {
  if (typeof method === 'undefined') {
    throw new NoMethodError(EXPECTED_METHOD)
  }
  return new Entry(method)
}

function ensureExported([declaration, node]: MainExport): [NonNullable<MainExport[0]>, MainExport[1]] {
  if (typeof declaration === 'undefined') {
    throw new NoExportError(EXPECTED_EXPORT)
  }
  return [declaration, node]
}

function isOptimisedComprehension(expression: Expression): boolean {
  // 1e12
  if (isLiteral(expression, undefined, '1e12')) {
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
      || (isBinaryExpression(expression.left, '**') && isLiteral(expression.left.left, 10) && isLiteral(expression.left.right, 9))
      || (isCallExpression(expression.left, 'Math', 'pow') && isLiteral(expression.left.arguments[0], 10) && isLiteral(expression.left.arguments[1], 9))

    if (isOptimisedGigasecondLeft) {
      // ◼ * 1000
      // ◼ * 1e3
      return isLiteral(expression.right, 1000)
        || isLiteral(expression.right, undefined, '1e3')
    }

    // ◼ * 1e9
    // ◼ * 10 ** 9
    // ◼ * Math.pow(10, 9)
    const isOptimisedGigasecondRight =
         isLiteral(expression.right, undefined, '1e9')
      || (isBinaryExpression(expression.right, '**') && isLiteral(expression.right.left, 10) && isLiteral(expression.right.right, 9))
      || (isCallExpression(expression.right, 'Math', 'pow') && isLiteral(expression.right.arguments[0], 10) && isLiteral(expression.right.arguments[1], 9))

    // 1000 * ◼
    // 1e3 * ◼
    return isOptimisedGigasecondRight && (
         isLiteral(expression.left, 1000)
      || isLiteral(expression.left, undefined, '1e3')
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
  logger.log('~> expression is not an optimised comprehension')
  logger.log(JSON.stringify(expression, null, 2))
  return false
}
