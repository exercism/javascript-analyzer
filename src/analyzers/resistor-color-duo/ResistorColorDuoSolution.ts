import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";
import { Statement, Node, MemberExpression, CallExpression, ArrowFunctionExpression, FunctionExpression, TemplateLiteral } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";

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
import { getProcessLogger, Logger } from "~src/utils/logger";
import { Source } from "../SourceImpl";
import { findAll } from "../utils/find_all";
import { isMemberExpression } from "../utils/is_member_expression";
import { isTemplateLiteral } from "../utils/is_template_literal";

type Program = TSESTree.Program
type Parameter = TSESTree.Parameter
type Expression = TSESTree.Expression

type MainExport = ReturnType<typeof extractExport>

const EXPECTED_METHOD = 'value'
const EXPECTED_EXPORT = 'value'

export class MissingExpectedCall {
  constructor(public readonly methodName: string, public readonly reason: string) {}
}

export class HelperNotOptimal {
  constructor(public readonly helperName: string, public readonly declaration: MainMethod<string>) {}
}

export class MethodNotFound {
  constructor(public readonly methodName: string) {}
}

export class HelperCallNotFound {
  constructor(public readonly callRoot: Expression | undefined) {}
}

type Issue = undefined
| MissingExpectedCall
| HelperNotOptimal
| MethodNotFound
| HelperCallNotFound

class Constant {
  public readonly name: string

  constructor(private readonly constant: Readonly<ProgramConstant>) {
    this.name = (constant && isIdentifier(constant.id) && constant.id.name) || '<NO-CONSTANT-NAME>'
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
  private lastIssue_: Issue;

  constructor(method: Readonly<NonNullable<MainMethod>>, source: Readonly<Source>) {
    this.name = (method && method.id && method.id.name) || EXPECTED_METHOD
    this.params = method.params
    this.body = extractMainBody(method)

    this.signature = source.getOuter(method.parent || method)
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
    return isIdentifier(this.params[0])
  }

  public get hasOptimalParameter(): boolean {
    const [param] = this.params
    return param.type === AST_NODE_TYPES.ArrayPattern
      && param.elements.length === 2
      && isIdentifier(param.elements[0])
      && isIdentifier(param.elements[1])
  }

  public get hasOneMap(): boolean {
    return findAll(this.body, (node) => isCallExpression(node, undefined, 'map')).length === 1
  }

  public get hasOneReduce(): boolean {
    return findAll(this.body, (node) => isCallExpression(node, undefined, 'reduce')).length === 1
  }

  public get hasOneSlice(): boolean {
    const [slice, secondSlice] = findAll<CallExpression>(this.body, (node) => isCallExpression(node, undefined, 'slice') || isCallExpression(node, undefined, 'splice'))
    return slice
      && !secondSlice
      && slice.arguments.length === 2
      && isLiteral(slice.arguments[0], 0)
      && isLiteral(slice.arguments[1], 2)
  }

  public get hasOneOptimalConversion(): boolean {
    return findAll(this.body, (node) => isCallExpression(node, 'Number')).length === 1
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

  public get hasParseInt(): boolean {
    return findFirst(this.body, (node) => isCallExpression(node, 'parseInt') || isCallExpression(node, 'Number', 'parseInt')) !== undefined
  }

  public get hasDigitsString(): boolean {
    const template = findFirst<TemplateLiteral>(this.body, (node) => isTemplateLiteral(node))
    return template
      && template.quasis.length === 3
      && template.quasis.every((quasi) => quasi.value.cooked === '')
      && template.expressions.length === 2
      && template.expressions[0].type === template.expressions[1].type
      || false
  }

  public get parameterType(): Parameter['type'] {
    return this.params[0].type
  }

  public get parameterName(): string {
    return parameterName(this.params[0])
  }

  public isOptimal(constant: Readonly<Constant> | undefined, program: Program): boolean {
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

    if (this.hasOneMap) {
      logger.log('~> is a map solution')
      return this.isOptimalMapSolution(logger, mainBody, constant, program)
    }

    if (this.hasOneReduce) {
      logger.log('~> is a reduce solution')
      return this.isOptimalReduceSolution(logger, mainBody, constant)
    }

    logger.log('~> is a math solution')
    return this.isOptimalMathSolution(logger, mainBody, constant, program)
  }

  public isOptimalMapSolution(logger: Logger, body: MainBody, constant: Readonly<Constant> | undefined, program: Program): boolean {
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
    const callExpressions = findAll<CallExpression>(body, (node) => node.type === AST_NODE_TYPES.CallExpression)

    let hasNumberConversion = false
    let hasMap = false
    let hasJoin = false
    let hasSlice = false
    let helperMethodName = undefined
    let helperMethod: FunctionExpression | ArrowFunctionExpression | undefined = undefined
    const extraneousCalls: CallExpression[] = []

    // This loop is later referenced as "the looper".
    for (const expression of callExpressions) {
      if (!hasSlice && (isMemberExpression(expression.callee, undefined, 'slice') || isMemberExpression(expression.callee, undefined, 'splice'))) {
        hasSlice = expression.arguments.length === 2 && isLiteral(expression.arguments[0], 0) && isLiteral(expression.arguments[1], 2)
        continue
      }

      if (!hasMap && isMemberExpression(expression.callee, undefined, 'map')) {
        if (expression.arguments.length === 1) {
          const [argument] = expression.arguments
          if (isIdentifier(argument)) {
            hasMap = true
            helperMethodName = argument.name
            continue
          }

          if ([AST_NODE_TYPES.ArrowFunctionExpression, AST_NODE_TYPES.FunctionExpression].some((type) => argument.type === type)) {
            hasMap = true
            helperMethod = argument as ArrowFunctionExpression | FunctionExpression
            continue
          }

          extraneousCalls.push(expression)
          break
        }

        extraneousCalls.push(expression)
        break
      }

      if (!hasJoin && isMemberExpression(expression.callee, undefined, 'join')) {
        hasJoin = expression.arguments.length === 1 && isLiteral(expression.arguments[0], '')
        continue
      }

      if (!hasNumberConversion && isCallExpression(expression, 'Number')) {
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
        const helperDeclaration = findMethod(program, helperMethodName)
        if (!helperDeclaration) {
          logger.log(`~> could not find helper ${helperMethodName}`)
          this.lastIssue_ = new MethodNotFound(helperMethodName)
          return false
        }

        if (!constant || !this.isOptimalHelper(helperDeclaration, constant)) {
          logger.log(`~> helper ${helperMethodName} is not optimal`)
          this.lastIssue_ = new HelperNotOptimal(helperMethodName, helperDeclaration)
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

        const firstMap = findFirst<CallExpression>(body, (node) => isCallExpression(node, undefined, 'map'))
        const firstExpression = firstMap && (
          (firstMap.arguments[0].type === AST_NODE_TYPES.ArrowFunctionExpression && firstMap.arguments[0])
          || (firstMap.arguments[0].type === AST_NODE_TYPES.FunctionExpression && firstMap.arguments[0])
        ) || undefined

        if (!firstExpression || firstExpression.params.length !== 1 || !isIdentifier(firstExpression.params[0])) {
          logger.log(`~> anonymous function inside .map does not have an expected signature`)
          return false
        }

        // Anonymous helper method
        for (let i = extraneousCalls.length - 1; i >= 0; i--) {
          const { name } = firstExpression.params[0]

          // Check if this is a call using the "map" argument
          const call = extraneousCalls[i]
          if (isIdentifier(call.callee)
            && call.arguments.length === 1
            && isIdentifier(call.arguments[0], name)
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

        const helperDeclaration = findMethod(program, helperMethodName)
        if (!helperDeclaration) {
          logger.log(`~> could not find helper ${helperMethodName}`)
          this.lastIssue_ = new MethodNotFound(helperMethodName)
          return false
        }

        if (!constant || !this.isOptimalHelper(helperDeclaration, constant)) {
          logger.log(`~> helper function ${helperMethodName} referenced inside .map is not optimal`)
          this.lastIssue_ = new HelperNotOptimal(helperMethodName, helperDeclaration)
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
      logger.log(`~> has extraneous call: ${JSON.stringify(extraneousCalls, undefined, 2)}`)
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
        '.join(\'\')',
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

  public isOptimalReduceSolution(logger: Logger, body: MainBody, constant?: Readonly<Constant>): boolean {
    logger.log(`~> reduce optimal check is not implemented: ${body.type} (${constant && constant.name})`)
    // colors.slice(0, 2).reduce((acc, color) => acc * 10 + colorCode(code), 0)
    // colors.slice(0, 2).reverse().reduce((acc, color, index) => acc + colorCode(code) * (10 ** index), 0)
    return false
  }

  public isOptimalMathSolution(logger: Logger, body: MainBody & { argument?: Statement | Expression | null }, constant: Readonly<Constant> | undefined, program: Program): boolean {
    // If we got here, it knows it's a return statement
    //
    // return ...
    //

    const { argument } = body
    if (!argument || !isBinaryExpression(argument, '+')) {
      logger.log(`~> argument is not a + b: ${JSON.stringify(argument, null, 2)}`)
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
    if (param.type === AST_NODE_TYPES.ArrayPattern && param.elements.length === 2) {
      const [tens, ones] = param.elements

      const tensName = isIdentifier(tens) && tens.name || undefined
      const onesName = isIdentifier(ones) && ones.name || undefined

      isTensValue = tensName && ((node): boolean => isIdentifier(node, tensName)) || undefined
      isOnesValue = onesName && ((node): boolean => isIdentifier(node, onesName)) || undefined

    // In the second case, the values are accessed by index (param[0], param[1])
    } else if (this.hasSimpleParameter) {
      const allName = this.parameterName

      isTensValue = allName && ((node): boolean => isMemberExpression(node, allName, 0)) || undefined
      isOnesValue = allName && ((node): boolean => isMemberExpression(node, allName, 1)) || undefined
    }

    if (isTensValue === undefined || isOnesValue === undefined) {
      logger.log('~> can\'t figure out how colors are retrieved')
      return false
    }

    const leftContainsHelper = left.type === AST_NODE_TYPES.CallExpression && isIdentifier(left.callee) && left.arguments.length === 1
    const rightContainsHelper = right.type === AST_NODE_TYPES.CallExpression && isIdentifier(right.callee) && right.arguments.length === 1

    if (!leftContainsHelper && !rightContainsHelper) {
      logger.log('~> no helper method expression found')
      this.lastIssue_ = new HelperCallNotFound(argument)
      return false
    }

    const helperMethodName =
      (left.type === AST_NODE_TYPES.CallExpression && isIdentifier(left.callee) && left.callee.name)
      || (right.type === AST_NODE_TYPES.CallExpression && isIdentifier(right.callee) && right.callee.name)
      || undefined

    if (!helperMethodName || !constant) {
      logger.log('~> no helper method name')
      this.lastIssue_ = new HelperCallNotFound(argument)
      return false
    }

    const helperDeclaration = findMethod(program, helperMethodName)
    if (!helperDeclaration) {
      logger.log(`~> could not find helper ${helperMethodName}`)
      this.lastIssue_ = new MethodNotFound(helperMethodName)
      return false
    }

    if (!this.isOptimalHelper(helperDeclaration, constant)) {
      logger.log(`~> helper is not optimal`)
      this.lastIssue_ = new HelperNotOptimal(helperMethodName, helperDeclaration)
      return false
    }

    // colorCode(ones) + a * b
    if (
      isCallExpression(left, helperMethodName)
      && left.arguments.length === 1
      && isOnesValue(left.arguments[0])
      && isBinaryExpression(right, '*')
    ) {
      const { left: innerLeft, right: innerRight } = right

      // colorCode(ones) + colorCode(tens) * 10
      if (
        isCallExpression(innerLeft, helperMethodName)
        && innerLeft.arguments.length === 1
        && isTensValue(innerLeft.arguments[0])
        && isLiteral(innerRight, 10)
      ) {
        return true
      }

      // colorCode(ones) + 10 * colorCode(tens)
      return isCallExpression(innerRight, helperMethodName)
        && innerRight.arguments.length === 1
        && isTensValue(innerRight.arguments[0])
        && isLiteral(innerLeft, 10)
    }

    // a * b + colorCode(ones)
    if (
      isCallExpression(right, helperMethodName)
      && right.arguments.length === 1
      && isOnesValue(right.arguments[0])
      && isBinaryExpression(left, '*')
    ) {
      const { left: innerLeft, right: innerRight } = left

      // colorCode(tens) * 10 + colorCode(ones)
      if (
        isCallExpression(innerLeft, helperMethodName)
        && innerLeft.arguments.length === 1
        && isTensValue(innerLeft.arguments[0])
        && isLiteral(innerRight, 10)
      ) {
        return true
      }

      // 10 * colorCode(tens) + colorCode(ones)
      return isCallExpression(innerRight, helperMethodName)
        && innerRight.arguments.length === 1
        && isTensValue(innerRight.arguments[0])
        && isLiteral(innerLeft, 10)
    }

    logger.log('~> body of expected math solution is not math')
    return false
  }

  public isOptimalHelper(func: ArrowFunctionExpression | FunctionExpression | MainMethod<string>, constant: Readonly<Constant>): boolean {
    if (func.body && func.body.type === AST_NODE_TYPES.BlockStatement && func.body.body && func.body.body[0].type === AST_NODE_TYPES.ReturnStatement) {
      func.body = func.body.body[0].argument
    }

    if (constant.isOptimalArray) {
      // Only looking for:
      //
      // COLORS.indexOf(param)
      const { body } = func
      return body
        && isCallExpression(body, constant.name, 'indexOf')
        && func.params.length === 1
        && isIdentifier(func.params[0])
        && body.arguments.length === 1
        && isIdentifier(body.arguments[0], func.params[0].name)
        || false
    }

    if (constant.isOptimalObject) {
      // Only looking for:
      //
      // COLORS[param]
      const { body } = func
      return body
        && func.params.length === 1
        && isIdentifier(func.params[0])
        && isCallExpression(body, constant.name, func.params[0].name)
        && body.callee.computed
        || false
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
      .filter((declaration): boolean => declaration && isIdentifier(declaration.id) && declaration.id.name !== EXPECTED_METHOD)
  }

  public get entry(): Readonly<Entry> {
    return this.mainMethod
  }

  public get hasOneConstant(): boolean  {
    return this.fileConstants.length === 1
  }

  public get hasOptimalEntry(): boolean {
    return this.entry.isOptimal(new Constant(this.fileConstants[0]), this.program)
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
    // export function value
    // => no specififers
    //
    // export { value }
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

function findMethod<M extends string>(program: Program, method: M): MainMethod<M> | undefined {
  return extractMainMethod(program, method)
}
