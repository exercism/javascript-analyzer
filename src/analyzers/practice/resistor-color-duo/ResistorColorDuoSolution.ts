import {
  ExtractedExport,
  ExtractedFunction,
  ExtractedVariable,
  extractExports,
  extractFunctions,
  extractVariables,
  findAll,
  findFirst,
  findTopLevelConstants,
  getProcessLogger,
  guardBinaryExpression,
  guardCallExpression,
  guardIdentifier,
  guardLiteral,
  guardMemberExpression,
  guardTemplateLiteral,
  Logger,
  ProgramConstants,
  SpecificFunctionCall,
  SpecificObjectPropertyCall,
  SpecificPropertyCall,
} from '@exercism/static-analysis'
import type { TSESTree } from '@typescript-eslint/typescript-estree'
import { AST_NODE_TYPES } from '@typescript-eslint/typescript-estree'
import { Source } from '~src/analyzers/SourceImpl'
import { parameterName } from '~src/analyzers/utils/extract_parameter'
import { assertNamedExport } from '~src/asserts/assert_named_export'
import { assertNamedFunction } from '~src/asserts/assert_named_function'
import { extractSignature } from '~src/extracts/extract_declaration'
import { extractNamedFunction } from '~src/extracts/extract_named_function'
import { guardLiteralCaseInsensitive } from '../../utils/guard_literal_case_insensitive'

type Node = TSESTree.Node
type Program = TSESTree.Program
type Parameter = TSESTree.Parameter
type Expression = TSESTree.Expression
type CallExpression = TSESTree.CallExpression
type TemplateLiteral = TSESTree.TemplateLiteral
type Statement = TSESTree.Statement

type MainExport = ReturnType<typeof extractExports>[number]

const EXPECTED_METHOD = 'decodedValue'
const EXPECTED_EXPORT = 'decodedValue'
const PROBABLE_CONSTANT = 'COLORS'

export class MissingExpectedCall {
  constructor(
    public readonly methodName: string,
    public readonly reason: string
  ) {}
}

export class HelperNotOptimal {
  constructor(
    public readonly helperName: string,
    public readonly declaration: ExtractedFunction
  ) {}
}

export class MethodNotFound {
  constructor(public readonly methodName: string) {}
}

export class HelperCallNotFound {
  constructor(public readonly callRoot: Expression | undefined) {}
}

export class UnexpectedCallFound {
  constructor(
    public readonly unexpected: string,
    public readonly expected: string
  ) {}
}

export class ShouldDefineTopLevelConstant {
  constructor(public readonly name: string, public readonly value: string) {}
}

type Issue =
  | undefined
  | MissingExpectedCall
  | HelperNotOptimal
  | MethodNotFound
  | HelperCallNotFound
  | UnexpectedCallFound
  | ShouldDefineTopLevelConstant

class Constant {
  public readonly name: string
  public readonly signature: string

  constructor(
    private readonly constant: Readonly<ExtractedVariable>,
    source: Source
  ) {
    this.name = constant.name || '<NO NAME>'
    this.signature = source.getOuter(constant.node)
  }

  public get kind(): ExtractedVariable['kind'] {
    return this.constant.kind
  }

  public get isOfKindConst(): boolean {
    return this.kind === 'const'
  }

  public get isOptimalArray(): boolean {
    const init = this.constant.init as Expression

    if (!init) {
      return false
    }

    init.type

    const literals = [
      'black',
      'brown',
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'violet',
      'grey',
      'white',
    ]

    if (init.type === AST_NODE_TYPES.ArrayExpression) {
      // Each literal needs to be present, and needs to be present exactly in this order
      return init.elements.every((value, index): boolean =>
        guardLiteral(value, literals[index])
      )
    }

    return false
  }

  public get isNonOptimalArray(): boolean {
    const { init } = this.constant

    if (!init) {
      return false
    }

    const literals = [
      'black',
      'brown',
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'violet',
      'grey',
      'white',
    ]

    if (init.type === AST_NODE_TYPES.ArrayExpression) {
      // Each literal needs to be present, and needs to be present exactly in this order
      return init.elements.every((value, index): boolean =>
        guardLiteralCaseInsensitive(value, literals[index])
      )
    }

    return false
  }

  public get isObjectToArray(): boolean {
    const { init } = this.constant

    if (!init) {
      return false
    }

    if (!guardCallExpression(init, 'Object', 'keys')) {
      return false
    }

    const [argument, second] = init.arguments
    return !second && guardIdentifier(argument)
  }

  public isOptimalObject(
    node: ExtractedVariable | undefined = this.constant
  ): boolean {
    if (!node || !node.init) {
      return false
    }

    if (node.init.type !== AST_NODE_TYPES.ObjectExpression) {
      return false
    }

    const keys = [
      'black',
      'brown',
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'violet',
      'grey',
      'white',
    ]

    return node.init.properties.every((property, index): boolean => {
      return (
        property.type === AST_NODE_TYPES.Property &&
        guardLiteral(property.key, keys[index]) &&
        guardLiteral(property.value, index)
      )
    })
  }

  public isNonOptimalObject(
    node: ExtractedVariable | undefined = this.constant
  ): boolean {
    if (!node || !node.init) {
      return false
    }

    if (node.init.type !== AST_NODE_TYPES.ObjectExpression) {
      return false
    }

    const keys = [
      'black',
      'brown',
      'red',
      'orange',
      'yellow',
      'green',
      'blue',
      'violet',
      'grey',
      'white',
    ]

    return node.init.properties.every((property, index): boolean => {
      return (
        property.type === AST_NODE_TYPES.Property &&
        guardLiteralCaseInsensitive(property.key, keys[index]) &&
        guardLiteral(property.value, index)
      )
    })
  }

  /**
   * In the case that the top-level constant is constructed from
   * Object.keys(argument), or is an object literal, this property holds the
   * name of the "argument" of that Object.keys call, or the object literal.
   *
   * @readonly
   * @type {(string | undefined)}
   * @memberof Constant
   */
  public get referencedSourceObjectName(): string | undefined {
    const { init } = this.constant

    if (!init || !guardCallExpression(init, 'Object', 'keys')) {
      // Try to figure out if this is:
      //
      // const COLOR_CODES = {
      //  'black': 0,
      //  'brown': 1,
      //  'red': 2,
      //  'orange': 3,
      //  'yellow': 4,
      //  'green': 5,
      //  'blue': 6,
      //  'violet': 7,
      //  'grey': 8,
      //  'white': 9,
      // };

      if (init?.type !== AST_NODE_TYPES.ObjectExpression) {
        return undefined
      }

      const keys = [
        'black',
        'brown',
        'red',
        'orange',
        'yellow',
        'green',
        'blue',
        'violet',
        'grey',
        'white',
      ]

      if (
        init.properties.every((property, index): boolean => {
          return (
            property.type === AST_NODE_TYPES.Property &&
            guardLiteral(property.key, keys[index]) &&
            guardLiteral(property.value, index)
          )
        })
      ) {
        return this.constant.name || undefined
      }

      return undefined
    }

    const [argument, second] = init.arguments

    if (second || !guardIdentifier(argument)) {
      return undefined
    }

    return argument.name
  }

  public isOptimal(constants: ExtractedVariable[]): boolean {
    return (
      this.isOfKindConst &&
      (this.isOptimalArray ||
        (this.isObjectToArray &&
          this.isOptimalObject(this.getReferencedObject(constants))))
    )
  }

  private getReferencedObject(
    constants: ExtractedVariable[]
  ): ExtractedVariable | undefined {
    const name = this.referencedSourceObjectName
    return constants.find((constant): boolean => constant.name === name)
  }
}

class Entry {
  public readonly name: string
  public readonly signature: string

  private readonly params: readonly Parameter[]
  private readonly body: Node
  private lastIssue_: Issue

  constructor(method: Readonly<ExtractedFunction>, source: Readonly<Source>) {
    this.name = method.name || EXPECTED_METHOD
    this.params = method.params
    this.body = method.body

    this.signature = extractSignature(method, source)
  }

  public get lastIssue(): Issue {
    return this.lastIssue_
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

  public get hasOptimalParameter(): boolean {
    const [param] = this.params
    return (
      !!param &&
      param.type === AST_NODE_TYPES.ArrayPattern &&
      param.elements.length === 2 &&
      !!param.elements[0] &&
      guardIdentifier(param.elements[0]) &&
      !!param.elements[1] &&
      guardIdentifier(param.elements[1])
    )
  }

  public get hasOneMap(): boolean {
    return (
      findAll(this.body, (node): node is SpecificPropertyCall<'map'> =>
        guardCallExpression(node, undefined, 'map')
      ).length === 1
    )
  }

  public get hasOneReduce(): boolean {
    return (
      findAll(this.body, (node): node is SpecificPropertyCall<'reduce'> =>
        guardCallExpression(node, undefined, 'reduce')
      ).length === 1
    )
  }

  public get hasOneSlice(): boolean {
    const [slice, secondSlice] = findAll<CallExpression>(
      this.body,
      (node): node is SpecificPropertyCall<'slice' | 'splice'> =>
        guardCallExpression(node, undefined, 'slice') ||
        guardCallExpression(node, undefined, 'splice')
    )
    return (
      slice &&
      !secondSlice &&
      slice.arguments.length === 2 &&
      guardLiteral(slice.arguments[0], 0) &&
      guardLiteral(slice.arguments[1], 2)
    )
  }

  public get hasOneOptimalConversion(): boolean {
    return (
      findAll(this.body, (node): node is SpecificFunctionCall<'Number'> =>
        guardCallExpression(node, 'Number')
      ).length === 1
    )
  }

  public get hasForEach(): boolean {
    return (
      findFirst(this.body, (node): node is SpecificPropertyCall<'forEach'> =>
        guardCallExpression(node, undefined, 'forEach')
      ) !== undefined
    )
  }

  public get hasFor(): boolean {
    return (
      findFirst(
        this.body,
        (
          node
        ): node is
          | TSESTree.ForInStatement
          | TSESTree.ForOfStatement
          | TSESTree.ForStatement =>
          [
            AST_NODE_TYPES.ForInStatement,
            AST_NODE_TYPES.ForOfStatement,
            AST_NODE_TYPES.ForStatement,
          ].some((type) => type === node.type)
      ) !== undefined
    )
  }

  public get hasParseInt(): boolean {
    return (
      findFirst(
        this.body,
        (
          node
        ): node is
          | SpecificFunctionCall<'parseInt'>
          | SpecificObjectPropertyCall<'Number', 'parseInt'> =>
          guardCallExpression(node, 'parseInt') ||
          guardCallExpression(node, 'Number', 'parseInt')
      ) !== undefined
    )
  }

  public get hasDigitsString(): boolean {
    const template = findFirst<TemplateLiteral>(
      this.body,
      (node): node is TemplateLiteral => guardTemplateLiteral(node)
    )
    return (
      (template &&
        template.quasis.length === 3 &&
        template.quasis.every((quasi) => quasi.value.cooked === '') &&
        template.expressions.length === 2 &&
        template.expressions[0].type === template.expressions[1].type) ||
      false
    )
  }

  public get parameterType(): Parameter['type'] {
    return this.params[0].type
  }

  public get parameterName(): string {
    return parameterName(this.params[0])
  }

  public isOptimal(
    constant: Readonly<Constant> | undefined,
    program: Program
  ): boolean {
    const logger = getProcessLogger()

    let argument: Node | null = null

    // If is not a simple return
    //
    if (this.body.type !== AST_NODE_TYPES.ReturnStatement) {
      if (this.body.type !== AST_NODE_TYPES.BlockStatement) {
        logger.log(`~> body type is: ${this.body.type}`)
        argument = this.body
      } else {
        const finalStatement = this.body.body.slice().reverse()[0]

        if (finalStatement.type !== AST_NODE_TYPES.ReturnStatement) {
          logger.log(
            `~> body type is a block with the final statement type: ${finalStatement.type}`
          )
          return false
        }

        argument = finalStatement.argument
      }
    }

    if (!constant) {
      const issue = this.hasConstantDefinedInBody()
      if (issue instanceof ShouldDefineTopLevelConstant) {
        logger.log('~> found a constant that was not declared at the top level')
        this.lastIssue_ = issue
        return false
      }
    }

    if (this.hasOneMap) {
      logger.log('~> is a map solution')
      return this.isOptimalMapSolution(logger, this.body, constant, program)
    }

    if (this.hasOneReduce) {
      logger.log('~> is a reduce solution')
      return this.isOptimalReduceSolution(logger, this.body, constant)
    }

    logger.log('~> is a math solution')
    return this.isOptimalMathSolution(
      logger,
      this.body,
      argument,
      constant,
      program
    )
  }

  public isOptimalMapSolution(
    logger: Logger,
    body: Node,
    constant: Readonly<Constant> | undefined,
    program: Program
  ): boolean {
    // This is what is considered approvable
    //
    // return Number(
    //   colors
    //     .slice(0, 2)
    //     .map(colorCode)
    //     .join('')
    // )
    //
    // alternatively
    //
    // const string = colors.slice(0, 2).map(colorCode).join('')
    // return Number(string)
    //
    const callExpressions = findAll<CallExpression>(
      body,
      (node): node is CallExpression =>
        node.type === AST_NODE_TYPES.CallExpression
    )

    let hasNumberConversion = false
    let hasMap = false
    let hasJoin = false
    let hasSlice = false
    let helperMethodName = undefined
    let helperMethod:
      | TSESTree.FunctionExpression
      | TSESTree.ArrowFunctionExpression
      | undefined = undefined
    const extraneousCalls: CallExpression[] = []

    // This loop is later referenced as "the looper".
    for (const expression of callExpressions) {
      if (
        !hasSlice &&
        (guardMemberExpression(expression.callee, undefined, 'slice') ||
          guardMemberExpression(expression.callee, undefined, 'splice'))
      ) {
        hasSlice =
          expression.arguments.length === 2 &&
          guardLiteral(expression.arguments[0], 0) &&
          guardLiteral(expression.arguments[1], 2)
        continue
      }

      if (
        !hasMap &&
        guardMemberExpression(expression.callee, undefined, 'map')
      ) {
        if (expression.arguments.length === 1) {
          const [argument] = expression.arguments
          if (guardIdentifier(argument)) {
            hasMap = true
            helperMethodName = argument.name
            continue
          }

          if (
            [
              AST_NODE_TYPES.ArrowFunctionExpression,
              AST_NODE_TYPES.FunctionExpression,
            ].some((type) => argument.type === type)
          ) {
            hasMap = true
            helperMethod = argument as
              | TSESTree.ArrowFunctionExpression
              | TSESTree.FunctionExpression
            continue
          }

          extraneousCalls.push(expression)
          break
        }

        extraneousCalls.push(expression)
        break
      }

      if (
        !hasJoin &&
        guardMemberExpression(expression.callee, undefined, 'join')
      ) {
        hasJoin =
          expression.arguments.length === 1 &&
          guardLiteral(expression.arguments[0], '')
        continue
      }

      if (!hasNumberConversion && guardCallExpression(expression, 'Number')) {
        hasNumberConversion = true
        continue
      }

      extraneousCalls.push(expression)
      continue
    }

    if (helperMethod || helperMethodName) {
      // Extracted helper method (yay)
      //
      // The code below checks if the referenced helper is optimal.
      //
      if (helperMethodName) {
        const helperDeclaration =
          extractNamedFunction(helperMethodName, program) ||
          extractNamedFunction(helperMethodName, body)
        if (!helperDeclaration) {
          logger.log(`~> could not find helper ${helperMethodName}`)
          this.lastIssue_ = new MethodNotFound(helperMethodName)
          return false
        }

        if (
          !constant ||
          !this.isOptimalHelper(helperDeclaration.node, constant)
        ) {
          logger.log(`~> helper ${helperMethodName} is not optimal`)
          this.lastIssue_ = new HelperNotOptimal(
            helperMethodName,
            helperDeclaration
          )
          return false
        }

        // The code below DELETES extraneous calls that are calls to the helper method. These calls can be part of the
        // anonymous function (arrow or regular) which is inside the .map call. The code looks like this:
        //
        //   .map((arg) => helperMethod(arg))
        //
        // or
        //
        //   .map(function (arg) { return helperMethod(arg) })
        //
        // "The looper" above also (incorrectly) collects the "helperMethod" call expressions. These are valid calls
        // and therefore are removed from the "extra calls list" now.
      } else {
        const firstMap = findFirst<CallExpression>(
          body,
          (node): node is SpecificPropertyCall<'map'> =>
            guardCallExpression(node, undefined, 'map')
        )
        const firstExpression =
          (firstMap &&
            ((firstMap.arguments[0].type ===
              AST_NODE_TYPES.ArrowFunctionExpression &&
              firstMap.arguments[0]) ||
              (firstMap.arguments[0].type ===
                AST_NODE_TYPES.FunctionExpression &&
                firstMap.arguments[0]))) ||
          undefined

        if (
          !firstExpression ||
          firstExpression.params.length !== 1 ||
          !guardIdentifier(firstExpression.params[0])
        ) {
          logger.log(
            `~> anonymous function inside .map does not have an expected signature`
          )
          return false
        }

        // Anonymous helper method
        for (let i = extraneousCalls.length - 1; i >= 0; i--) {
          const { name } = firstExpression.params[0]

          // Check if this is a call using the "map" argument
          const call = extraneousCalls[i]
          if (
            guardIdentifier(call.callee) &&
            call.arguments.length === 1 &&
            guardIdentifier(call.arguments[0], name)
          ) {
            delete extraneousCalls[i]
            helperMethodName = call.callee.name
          }
        }

        if (!helperMethodName) {
          logger.log(`~> anonymous function inside .map is not using a helper`)
          this.lastIssue_ = new HelperCallNotFound(firstMap)
          return false
        }

        const helperDeclaration =
          extractNamedFunction(helperMethodName, program) ||
          extractNamedFunction(helperMethodName, body)
        if (!helperDeclaration) {
          logger.log(`~> could not find helper ${helperMethodName}`)
          this.lastIssue_ = new MethodNotFound(helperMethodName)
          return false
        }

        if (
          !constant ||
          !this.isOptimalHelper(helperDeclaration.node, constant)
        ) {
          logger.log(
            `~> helper function ${helperMethodName} referenced inside .map is not optimal`
          )
          this.lastIssue_ = new HelperNotOptimal(
            helperMethodName,
            helperDeclaration
          )
          return false
        }
      }
    } else {
      logger.log('~> lacking optimal helper method')
      return false
    }

    // If there is a call that we did not expect, it's probably not optimal.
    //
    if (extraneousCalls.filter(Boolean).length > 0) {
      logger.log(
        `~> has extraneous call: ${JSON.stringify(
          extraneousCalls,
          undefined,
          2
        )}`
      )
      return false
    }

    if (!hasMap) {
      logger.log('~> missing .map()')
      this.lastIssue_ = new MissingExpectedCall(
        `.map(${helperMethodName || 'colorCode'})`,
        'iterate over the colors and turn them into digits'
      )
      return false
    }

    if (!hasJoin) {
      logger.log('~> missing .join()')
      this.lastIssue_ = new MissingExpectedCall(
        ".join('')",
        'glue the digits together as a single number-string'
      )
      return false
    }

    if (!hasSlice) {
      logger.log('~> missing .slice()')
      this.lastIssue_ = new MissingExpectedCall(
        '.slice(0, 2)',
        'limit the number of colors processed to two'
      )
      return false
    }

    if (!hasNumberConversion) {
      logger.log('~> missing Number()')
      this.lastIssue_ = new MissingExpectedCall(
        'Number(...)',
        'convert the number-string back into an actual number'
      )
      return false
    }

    return true
  }

  public isOptimalReduceSolution(
    logger: Logger,
    body: Node,
    constant?: Readonly<Constant>
  ): boolean {
    logger.log(
      `~> reduce optimal check is not implemented: ${body.type} (${
        constant && constant.name
      })`
    )
    // colors.slice(0, 2).reduce((acc, color) => acc * 10 + colorCode(code), 0)
    // colors.slice(0, 2).reverse().reduce((acc, color, index) => acc + colorCode(code) * (10 ** index), 0)
    return false
  }

  public isOptimalMathSolution(
    logger: Logger,
    body: Node,
    argument: Node | null,
    constant: Readonly<Constant> | undefined,
    program: Program
  ): boolean {
    // If we got here, it knows it's a return statement
    //
    // return ...
    //
    if (!argument || !guardBinaryExpression(argument, '+')) {
      logger.log(
        `~> argument is not a + b: ${JSON.stringify(argument, null, 2)}`
      )
      return false
    }

    // If we got here, it knows it's a binary expression of +
    //
    // return x + y
    //

    const { left, right } = argument

    const [param] = this.params

    let isTensValue: ((node: Node) => boolean) | undefined = undefined
    let isOnesValue: ((node: Node) => boolean) | undefined = undefined

    // In the first case, the values have a name (tensName, onesName)...
    if (
      param.type === AST_NODE_TYPES.ArrayPattern &&
      param.elements.length === 2
    ) {
      const [tens, ones] = param.elements

      const tensName = (tens && guardIdentifier(tens) && tens.name) || undefined
      const onesName = (ones && guardIdentifier(ones) && ones.name) || undefined

      isTensValue =
        (tensName && ((node): boolean => guardIdentifier(node, tensName))) ||
        undefined
      isOnesValue =
        (onesName && ((node): boolean => guardIdentifier(node, onesName))) ||
        undefined

      // In the second case, the values are accessed by index (param[0], param[1])
    } else if (this.hasSimpleParameter) {
      const allName = this.parameterName

      isTensValue =
        (allName &&
          ((node): boolean => guardMemberExpression(node, allName, 0))) ||
        undefined
      isOnesValue =
        (allName &&
          ((node): boolean => guardMemberExpression(node, allName, 1))) ||
        undefined
    }

    if (isTensValue === undefined || isOnesValue === undefined) {
      logger.log("~> can't figure out how colors are retrieved")
      return false
    }

    const leftContainsHelper =
      left.type === AST_NODE_TYPES.CallExpression &&
      guardIdentifier(left.callee) &&
      left.arguments.length === 1
    const rightContainsHelper =
      right.type === AST_NODE_TYPES.CallExpression &&
      guardIdentifier(right.callee) &&
      right.arguments.length === 1

    if (!leftContainsHelper && !rightContainsHelper) {
      logger.log('~> no helper method expression found')
      this.lastIssue_ = new HelperCallNotFound(argument)
      return false
    }

    const helperMethodName =
      (left.type === AST_NODE_TYPES.CallExpression &&
        guardIdentifier(left.callee) &&
        left.callee.name) ||
      (right.type === AST_NODE_TYPES.CallExpression &&
        guardIdentifier(right.callee) &&
        right.callee.name) ||
      undefined

    if (!helperMethodName || !constant) {
      logger.log('~> no helper method name')
      this.lastIssue_ = new HelperCallNotFound(argument)
      return false
    }

    const helperDeclaration =
      extractNamedFunction(helperMethodName, program) ||
      extractNamedFunction(helperMethodName, body)
    if (!helperDeclaration) {
      logger.log(`~> could not find helper ${helperMethodName}`)
      this.lastIssue_ = new MethodNotFound(helperMethodName)
      return false
    }

    if (!this.isOptimalHelper(helperDeclaration.node, constant)) {
      logger.log(`~> helper is not optimal`)
      this.lastIssue_ = new HelperNotOptimal(
        helperMethodName,
        helperDeclaration
      )
      return false
    }

    // colorCode(ones) + a * b
    if (
      guardCallExpression(left, helperMethodName) &&
      left.arguments.length === 1 &&
      isOnesValue(left.arguments[0]) &&
      guardBinaryExpression(right, '*')
    ) {
      const { left: innerLeft, right: innerRight } = right

      // colorCode(ones) + colorCode(tens) * 10
      if (
        guardCallExpression(innerLeft, helperMethodName) &&
        innerLeft.arguments.length === 1 &&
        isTensValue(innerLeft.arguments[0]) &&
        guardLiteral(innerRight, 10)
      ) {
        return true
      }

      // colorCode(ones) + 10 * colorCode(tens)
      return (
        guardCallExpression(innerRight, helperMethodName) &&
        innerRight.arguments.length === 1 &&
        isTensValue(innerRight.arguments[0]) &&
        guardLiteral(innerLeft, 10)
      )
    }

    // a * b + colorCode(ones)
    if (
      guardCallExpression(right, helperMethodName) &&
      right.arguments.length === 1 &&
      isOnesValue(right.arguments[0]) &&
      guardBinaryExpression(left, '*')
    ) {
      const { left: innerLeft, right: innerRight } = left

      // colorCode(tens) * 10 + colorCode(ones)
      if (
        guardCallExpression(innerLeft, helperMethodName) &&
        innerLeft.arguments.length === 1 &&
        isTensValue(innerLeft.arguments[0]) &&
        guardLiteral(innerRight, 10)
      ) {
        return true
      }

      // 10 * colorCode(tens) + colorCode(ones)
      return (
        guardCallExpression(innerRight, helperMethodName) &&
        innerRight.arguments.length === 1 &&
        isTensValue(innerRight.arguments[0]) &&
        guardLiteral(innerLeft, 10)
      )
    }

    if (
      findFirst(
        argument,
        (node): node is SpecificObjectPropertyCall<string, 'shift'> =>
          guardIdentifier(param) &&
          guardCallExpression(node, param.name, 'shift')
      )
    ) {
      logger.log('~> should not be shifting')
      this.lastIssue_ = new UnexpectedCallFound(
        '.shift()',
        `${parameterName(param)}[<index>]\` or \`[destruc, turing]`
      )
      return false
    }

    logger.log('~> body of expected math solution is not math')
    return false
  }

  public isOptimalHelper(func: Node, constant: Readonly<Constant>): boolean {
    const logger = getProcessLogger()

    let body: Node | null
    let params: Parameter[] | null

    switch (func.type) {
      case AST_NODE_TYPES.BlockStatement: {
        body = func.body[0]
        params = null
        break
      }
      case AST_NODE_TYPES.ReturnStatement: {
        body = func.argument
        params = null
        break
      }
      case AST_NODE_TYPES.CallExpression: {
        body = func
        params = null
        break
      }
      case AST_NODE_TYPES.MemberExpression: {
        body = func
        params = null
        break
      }
      case AST_NODE_TYPES.FunctionDeclaration: {
        body = func.body || null
        params = func.params
        break
      }
      case AST_NODE_TYPES.ArrowFunctionExpression: {
        body = func.body || null
        params = func.params
        break
      }
      case AST_NODE_TYPES.FunctionExpression: {
        body = func.body || null
        params = func.params
        break
      }
      case AST_NODE_TYPES.VariableDeclarator: {
        if (!func.init) {
          return false
        }
        return this.isOptimalHelper(func.init, constant)
      }
      default: {
        logger.log(`~> the helper type ${func.type} is not processable`)
        return false
      }
    }

    if (!params) {
      logger.log('~> could not get function parameters')
      return false
    }

    if (
      body &&
      body.type === AST_NODE_TYPES.BlockStatement &&
      body.body &&
      body.body[0].type === AST_NODE_TYPES.ReturnStatement
    ) {
      body = body.body[0].argument
    }

    if (!body) {
      logger.log('=> helper has no body')
      return false
    }

    if (constant.isOptimalArray || constant.isNonOptimalArray) {
      logger.log('=> constant is optimal array')

      // Only looking for:
      //
      // COLORS.indexOf(param)
      return (
        (guardCallExpression(body, constant.name, 'indexOf') &&
          params.length === 1 &&
          guardIdentifier(params[0]) &&
          body.arguments.length === 1 &&
          guardIdentifier(body.arguments[0], params[0].name)) ||
        false
      )
    }

    if (constant.isOptimalObject() || constant.isNonOptimalObject()) {
      logger.log('=> constant is optimal object')

      // Only looking for:
      //
      // REF_COLORS[param]
      return (
        (params.length === 1 &&
          guardIdentifier(params[0]) &&
          constant.name &&
          guardMemberExpression(body, constant.name, params[0].name) &&
          body.computed) ||
        false
      )
    }

    logger.log(`~> constant is not optimal`)
    return false
  }

  private hasConstantDefinedInBody(): ShouldDefineTopLevelConstant | undefined {
    const localConstants = extractVariables(this.body).filter(
      (constant) =>
        constant.init?.type === AST_NODE_TYPES.ArrayExpression ||
        constant.init?.type === AST_NODE_TYPES.ObjectExpression
    )
    if (localConstants.length) {
      const nameOfFirstConstant = localConstants[0].name || 'COLORS'
      return new ShouldDefineTopLevelConstant(nameOfFirstConstant, '...')
    }
  }
}

export class ResistorColorDuoSolution {
  public readonly source: Source

  private mainMethod: Entry
  private mainExport: ExtractedExport
  private fileConstants: ProgramConstants
  private mainConstant: Constant | undefined

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
    ]).filter(
      (declaration): boolean =>
        declaration &&
        guardIdentifier(declaration.id) &&
        declaration.id.name !== EXPECTED_METHOD
    )

    const expectedConstant =
      this.fileConstants.find((constant) =>
        guardIdentifier(constant.id, PROBABLE_CONSTANT)
      ) ||
      // Or find the first array or object assignment
      this.fileConstants.find(
        (constant) =>
          constant.init &&
          [
            AST_NODE_TYPES.ArrayExpression,
            AST_NODE_TYPES.ObjectExpression,
          ].indexOf(constant.init.type) !== -1
      )

    this.mainConstant =
      (expectedConstant &&
        new Constant(
          new ExtractedVariable(
            expectedConstant,
            expectedConstant.id,
            expectedConstant.kind,
            expectedConstant.init
          ),
          this.source
        )) ||
      undefined
  }

  public get entry(): Readonly<Entry> {
    return this.mainMethod
  }

  public get hasOneConstant(): boolean {
    return this.fileConstants.length === 1
  }

  public get hasOptimalEntry(): boolean {
    return this.entry.isOptimal(this.mainConstant, this.program)
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
    // export function decodedValue
    // => no specififers
    //
    // export { decodedValue }
    // => yes specififers
    //
    return this.mainExport.exportKind === 'value'
  }

  public isOptimal(): boolean {
    return this.hasOptimalEntry
  }
}
