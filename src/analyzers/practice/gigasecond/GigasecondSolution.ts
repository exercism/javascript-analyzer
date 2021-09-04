import {
  ExtractedExport,
  ExtractedFunction,
  ExtractedVariable,
  extractExports,
  extractFunctions,
  findFirst,
  findMemberCall,
  findTopLevelConstants,
  getProcessLogger,
  guardBinaryExpression,
  guardCallExpression,
  guardIdentifier,
  guardLiteral,
  isNewExpression,
  ProgramConstants,
} from '@exercism/static-analysis'
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { Source } from '~src/analyzers/SourceImpl'
import { parameterName } from '~src/analyzers/utils/extract_parameter'
import { assertNamedExport } from '~src/asserts/assert_named_export'
import { assertNamedFunction } from '~src/asserts/assert_named_function'
import { extractSignature } from '~src/extracts/extract_declaration'

type Node = TSESTree.Node
type Program = TSESTree.Program
type Parameter = TSESTree.Parameter
type Expression = TSESTree.Expression
type LargeNumberComprehension =
  | TSESTree.AssignmentExpression
  | TSESTree.AssignmentPattern
  | TSESTree.BinaryExpression
  | TSESTree.CallExpression
  | TSESTree.ExpressionStatement
  | TSESTree.Literal
  | TSESTree.VariableDeclarator

type MainExport = ReturnType<typeof extractExports>[number]

const EXPECTED_METHOD = 'gigasecond'
const EXPECTED_EXPORT = 'gigasecond'

class Constant {
  public readonly name: string
  private _memoized: { [key: string]: string | number | boolean }

  constructor(private readonly constant: Readonly<ExtractedVariable>) {
    this.name = constant.name || '<NO-CONSTANT-NAME>'
    this._memoized = {}
  }

  public get kind(): ExtractedVariable['kind'] {
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

    return (this._memoized['isOptimisedComprehension'] =
      isOptimisedComprehension(init))
  }

  public get isLargeNumberLiteral(): boolean {
    const { init } = this.constant

    if (!init) {
      return false
    }

    if ('isLargeNumberLiteral' in this._memoized) {
      return !!this._memoized['isLargeNumberLiteral']
    }

    return (this._memoized['isLargeNumberLiteral'] = isLargeNumberLiteral(init))
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

class Entry {
  public readonly name: string
  public readonly signature: string

  private readonly params: readonly Parameter[]
  private readonly body: Node

  constructor(method: Readonly<ExtractedFunction>, source: Readonly<Source>) {
    this.name = method.name || EXPECTED_METHOD
    this.params = method.params
    this.body = method.body

    this.signature = extractSignature(method, source)
  }

  public get hasAtLeastOneParameter(): boolean {
    return this.params.length > 0
  }

  public get hasExactlyOneParameter(): boolean {
    return this.params.length === 1
  }

  public get hasSimpleParameter(): boolean {
    return guardIdentifier(this.params[0])
  }

  public get hasDateParse(): boolean {
    return !!findMemberCall(this.body, 'Date', 'parse')
  }

  public get hasDateValueOnInput(): boolean {
    return !!findMemberCall(this.body, this.parameterName, 'valueOf')
  }

  public get hasGetSecondsOnInput(): boolean {
    return !!findMemberCall(this.body, this.parameterName, 'getSeconds')
  }

  public get hasSetSecondsOnInput(): boolean {
    return !!findMemberCall(this.body, this.parameterName, 'setSeconds')
  }

  public get parameterType(): Parameter['type'] {
    return this.params[0].type
  }

  public get parameterName(): string {
    return parameterName(this.params[0])
  }

  public isOptimal(
    constant: Readonly<Constant> | undefined,
    comprehension: Readonly<LargeNumberComprehension> | undefined
  ): boolean {
    const logger = getProcessLogger()

    let argument: Node | null = null

    // If is not a simple return
    //
    if (this.body.type === AST_NODE_TYPES.NewExpression) {
      argument = this.body
    } else if (this.body.type !== AST_NODE_TYPES.ReturnStatement) {
      if (
        comprehension === undefined ||
        this.body.type !== AST_NODE_TYPES.BlockStatement
      ) {
        logger.log(
          `~> body type is: ${this.body.type}, comprehension: ${comprehension?.type}`
        )
        return false
      }

      const finalStatement = this.body.body.slice().reverse()[0]

      if (finalStatement.type !== AST_NODE_TYPES.ReturnStatement) {
        logger.log(
          `~> body type is a block with the final statement type: ${finalStatement.type}`
        )
        return false
      }

      argument = finalStatement.argument
    }

    // If we got here, it knows it's a return statement
    //
    // return ...
    //

    if (!argument || !isNewExpression(argument, 'Date')) {
      logger.log(
        `~> argument is not new XXX: ${JSON.stringify(argument, null, 2)}`
      )
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
    if (!guardBinaryExpression(expression, '+')) {
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

    if (
      comprehension &&
      comprehension.type == AST_NODE_TYPES.VariableDeclarator
    ) {
      // Don't care about the kind because _there is no constant_. In that sense
      // it will not take into account the kind of the constant here.
      constant = new Constant(
        new ExtractedVariable(
          comprehension,
          comprehension.id,
          'const',
          comprehension.init
        )
      )

      logger.log(`~> the comprehension is a constant`)
    }

    // One of the two sides needs to be the argument.getTime call
    //
    const callExpression = guardCallExpression(
      expression.left,
      this.parameterName,
      'getTime'
    )
      ? expression.left
      : guardCallExpression(expression.right, this.parameterName, 'getTime') &&
        expression.right

    // One of the two sides needs to be the top-level constant or comprehension
    //
    if (constant) {
      const identifier = guardIdentifier(expression.left, constant.name)
        ? expression.left
        : guardIdentifier(expression.right, constant.name) && expression.right

      logger.log(
        `=> identifier: ${!!identifier}, expression: ${!!callExpression}`
      )
      return !!(callExpression && identifier)
    }

    // In this case the constant is just not extracted into the top-level, but
    // there is a comprehension.
    const comprehensionInExpression =
      expression.left === comprehension || expression.right === comprehension

    return !!(callExpression && comprehensionInExpression)
  }
}

export class GigasecondSolution {
  public readonly source: Source

  private mainMethod: Entry
  private mainExport: ExtractedExport
  private fileConstants: ProgramConstants
  private mainConstant: Constant | undefined
  private largeNumberComprehension: LargeNumberComprehension | undefined
  private largeNumberLiteral: LargeNumberComprehension | undefined

  constructor(public readonly program: Program, source: string) {
    this.source = new Source(source)

    const functions = extractFunctions(program)
    const exports = extractExports(program)

    this.mainMethod = new Entry(
      assertNamedFunction(EXPECTED_METHOD, functions),
      this.source
    )
    this.mainExport = assertNamedExport(EXPECTED_EXPORT, exports)

    // All constants at the top level that are _not_ the main method
    this.fileConstants = findTopLevelConstants(program, [
      'let',
      'const',
      'var',

      // TODO upstream bug
    ] as unknown as ['let']).filter(
      (declaration): boolean =>
        declaration &&
        guardIdentifier(declaration.id) &&
        declaration.id.name !== EXPECTED_METHOD
    )

    const expectedConstant =
      this.fileConstants.find(
        (value) =>
          guardIdentifier(value.id) &&
          (value.id.name.toUpperCase().includes('GIGASECOND') ||
            value.id.name.toUpperCase().includes('MS'))
      ) || this.fileConstants[0]

    this.mainConstant =
      (expectedConstant &&
        new Constant(
          new ExtractedVariable(
            expectedConstant,
            expectedConstant.id,
            expectedConstant.kind,
            expectedConstant.init
          )
        )) ||
      undefined
    this.largeNumberComprehension = findNumberComprehension(program)
    this.largeNumberLiteral = findNumberLiteral(program)
  }

  public get entry(): Readonly<Entry> {
    return this.mainMethod
  }

  public get constant(): Readonly<Constant> | undefined {
    return this.mainConstant
  }

  public get numberComprehension():
    | Readonly<LargeNumberComprehension>
    | undefined {
    return this.largeNumberComprehension
  }

  public get numberLiteral(): Readonly<LargeNumberComprehension> | undefined {
    return this.largeNumberLiteral
  }

  public get hasOneConstant(): boolean {
    return this.fileConstants.length === 1
  }

  public get hasOptimalConstant(): boolean {
    return this.hasOneConstant && this.constant!.isOptimal()
  }

  public get hasOptimalEntry(): boolean {
    return this.entry.isOptimal(this.constant, this.largeNumberComprehension)
  }

  public get areFileConstantsConst(): boolean {
    // const foo;
    // => kind: "const"
    //
    // let foo;
    // => kind: "let"
    //
    // var foo;
    // => kind: "var"
    //
    return this.fileConstants.every(
      (declaration): boolean => declaration.kind === 'const'
    )
  }

  public get hasInlineExport(): boolean {
    // export function gigasecond
    // => no specififers
    //
    // export { gigasecond }
    // => yes specififers
    //
    return this.mainExport.exportKind === 'value'
  }

  public isOptimal(): boolean {
    return this.hasOptimalEntry && this.hasOptimalConstant
  }
}

function findNumberComprehension(
  program: TSESTree.Node
): LargeNumberComprehension | undefined {
  return findFirst(program, (node): node is LargeNumberComprehension => {
    switch (node.type) {
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
  if (
    guardLiteral(expression, undefined, '1e12') ||
    guardLiteral(expression, undefined, '1E12')
  ) {
    return true
  }

  // Math.pow(10, 12)
  if (
    guardCallExpression(expression, 'Math', 'pow') &&
    guardLiteral(expression.arguments[0], 10) &&
    guardLiteral(expression.arguments[1], 12)
  ) {
    return true
  }

  // 10 ** 12
  if (
    guardBinaryExpression(expression, '**') &&
    guardLiteral(expression.left, 10) &&
    guardLiteral(expression.right, 12)
  ) {
    return true
  }

  // ◼ * ◼
  if (guardBinaryExpression(expression, '*')) {
    // 1e9 * ◼
    // 10 ** 9 * ◼
    // Math.pow(10, 9) * ◼
    const isOptimisedGigasecondLeft =
      guardLiteral(expression.left, undefined, '1e9') ||
      guardLiteral(expression.left, undefined, '1E9') ||
      (guardBinaryExpression(expression.left, '**') &&
        guardLiteral(expression.left.left, 10) &&
        guardLiteral(expression.left.right, 9)) ||
      (guardCallExpression(expression.left, 'Math', 'pow') &&
        guardLiteral(expression.left.arguments[0], 10) &&
        guardLiteral(expression.left.arguments[1], 9))

    if (isOptimisedGigasecondLeft) {
      // ◼ * 1000
      // ◼ * 1e3
      return (
        guardLiteral(expression.right, 1000) ||
        guardLiteral(expression.right, undefined, '1e3') ||
        guardLiteral(expression.right, undefined, '1E3')
      )
    }

    // ◼ * 1e9
    // ◼ * 10 ** 9
    // ◼ * Math.pow(10, 9)
    const isOptimisedGigasecondRight =
      guardLiteral(expression.right, undefined, '1e9') ||
      guardLiteral(expression.right, undefined, '1E9') ||
      (guardBinaryExpression(expression.right, '**') &&
        guardLiteral(expression.right.left, 10) &&
        guardLiteral(expression.right.right, 9)) ||
      (guardCallExpression(expression.right, 'Math', 'pow') &&
        guardLiteral(expression.right.arguments[0], 10) &&
        guardLiteral(expression.right.arguments[1], 9))

    // 1000 * ◼
    // 1e3 * ◼
    return (
      isOptimisedGigasecondRight &&
      (guardLiteral(expression.left, 1000) ||
        guardLiteral(expression.left, undefined, '1e3') ||
        guardLiteral(expression.left, undefined, '1E3'))
    )
  }

  // Math.pow(10, 12)
  if (
    guardCallExpression(expression, 'Math', 'pow') &&
    guardLiteral(expression.arguments[0], 10) &&
    guardLiteral(expression.arguments[1], 12)
  ) {
    return true
  }

  // 10 ** 12
  if (
    guardBinaryExpression(expression, '**') &&
    guardLiteral(expression.left, 10) &&
    guardLiteral(expression.right, 12)
  ) {
    return true
  }

  const logger = getProcessLogger()
  logger.log(
    `~> expression (${expression.type}) is not an optimised comprehension`
  )
  // logger.log(JSON.stringify(expression, null, 2))
  return false
}

function findNumberLiteral(
  program: TSESTree.Node
): LargeNumberComprehension | undefined {
  return findFirst(program, (node): node is LargeNumberComprehension => {
    switch (node.type) {
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
  if (guardLiteral(node, undefined, '1000000000000')) {
    return true
  }

  if (
    guardBinaryExpression(node, '*') &&
    // 1000000000 * 1000
    // 1000 * 1000000000
    // 1000 * 1000 * 1000
    ((guardLiteral(node.left, 1000000000) &&
      guardLiteral(node.right, undefined, '1000')) ||
      (guardLiteral(node.left, undefined, '1000') &&
        guardLiteral(node.right, 1000000000)) ||
      (guardBinaryExpression(node.left, '*') &&
        guardLiteral(node.right, undefined, '1000') &&
        guardLiteral(node.left.left, undefined, '1000') &&
        guardLiteral(node.left.right, undefined, '1000')))
  ) {
    return true
  }

  return false
}
