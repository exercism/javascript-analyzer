import {
  AstParser,
  ExtractedFunction,
  extractExports,
  findAll,
  findFirstOfType,
  guardAssignmentPattern,
  guardBinaryExpression,
  guardIdentifier,
  guardLiteral,
  guardLogicalExpression,
  guardReturnBlockStatement,
  guardReturnStatementWithValue,
  guardTemplateLiteral,
  guardUnaryExpression,
  Input,
  NoSourceError,
  ParsedSource,
  ParserError,
} from '@exercism/static-analysis'
import { ReturnStatement } from '@typescript-eslint/types/dist/ast-spec'
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { AnalyzerImpl } from '~src/analyzers/AnalyzerImpl'
import { parameterName } from '~src/analyzers/utils/extract_parameter'
import { annotateType } from '~src/analyzers/utils/type_annotations'
import { CommentType, factory } from '~src/comments/comment'
import {
  NO_METHOD,
  NO_NAMED_EXPORT,
  NO_PARAMETER,
  NO_VALUE_RETURNED,
  PREFER_STRICT_EQUALITY,
  PREFER_TEMPLATED_STRINGS,
  UNEXPECTED_SPLAT_ARGS,
} from '~src/comments/shared'
import { extractNamedFunction } from '~src/extracts/extract_named_function'
import { makeNoSourceOutput } from '~src/output/makeNoSourceOutput'
import { makeParseErrorOutput } from '~src/output/makeParseErrorOutput'
import { hasStubThrow } from '~src/analyzers/utils/extract_main_method'
import { REMOVE_STUB_THROW } from '~src/comments/remove_stub_throw'

type ConditionalExpression = TSESTree.ConditionalExpression
type IfStatement = TSESTree.IfStatement
type LogicalExpression = TSESTree.LogicalExpression
type Parameter = TSESTree.Parameter
type Program = TSESTree.Program
type TemplateLiteral = TSESTree.TemplateLiteral

/**
 * The factories here SHOULD be kept in sync with exercism/website-copy. Under
 * normal use, they do NOT dictate the actual commentary output of the analyzer,
 * as that is provided by the website-copy repo.
 *
 * https://github.com/exercism/website-copy/tree/master/automated-comments/javascript/two-fer
 */

const OPTIMISE_DEFAULT_VALUE = factory<'parameter'>`
You currently use a conditional to branch in case there is no value passed into
\`twoFer\`. Instead you could set the [default value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
of ${'parameter'} to 'you' to avoid this conditional.
`('javascript.two-fer.optimise_default_value', CommentType.Actionable)

const OPTIMISE_EXPLICIT_DEFAULT_VALUE = factory<
  'parameter' | 'maybe_undefined_expression'
>`
Instead of relying on ${'maybe_undefined_expression'} being "undefined" when
no value is passed in, you could set the default value of '${'parameter'}' to
'you'.
`('javascript.two-fer.optimise_explicity_default_value', CommentType.Actionable)

const REDIRECT_INCORRECT_STRING_TEMPLATE = factory`
The string template looks incorrect. Expected a template with 3 components.
`(
  'javascript.two-fer.redirect_incorrect_string_template',
  CommentType.Essential
)

const TIP_EXPORT_INLINE = factory`
Did you know that you can export functions, classes and constants directly
inline?
`('javascript.two-fer.export_inline', CommentType.Informative)

export class TwoFerAnalyzer extends AnalyzerImpl {
  private program!: Program
  private source!: string

  private mainMethod?: ExtractedFunction

  protected async execute(input: Input): Promise<void> {
    const [parsed] = await this.parse(input)

    this.program = parsed.program
    this.source = parsed.source

    this.mainMethod = extractNamedFunction('twoFer', this.program)

    // Firstly we want to check that the structure of this solution is correct
    // and that there is nothing structural stopping it from passing the tests
    this.checkStructure()
    if (!this.mainMethod) return

    if (hasStubThrow(this.mainMethod)) {
      this.disapprove(REMOVE_STUB_THROW())
      return
    }

    // Now we want to ensure that the method signature is sane and that it has
    // valid arguments
    this.checkSignature()

    // There are a handful optimal solutions for two-fer which needs no comments
    // and can just be approved. If we have it, then let's just acknowledge it
    // and get out of here.
    this.checkForOptimalSolutions()

    // There are correct solutions which don't use the default argument but
    // instead rely of the falsy nature of undefined. We'll approve these but
    // want to leave a comment that introduces them to string templates in case
    // they don't know about it.
    this.checkForApprovableSolutions()

    // The most common error in twofer is people using conditionals to check
    // where the value passed in is nil, rather than using a default value. We
    // want to check for conditionals and tell the user about the default
    // parameter if we see one.
    this.checkForConditionalOnDefaultArgument()

    // Sometimes people specify the names (if name == "Alice" ...). If we do
    // this, suggest using string templates to make us of the parameter, rather
    // than using a conditional on it.
    //

    // The solution is automatically referred to the mentor if it reaches this
  }

  private async parse(input: Input): never | Promise<ParsedSource[]> {
    try {
      return await AstParser.ANALYZER.parse(input)
    } catch (err) {
      // Here we handle errors that blew up the analyzer but we don't want to
      // report as blown up. This converts these errors to the commentary.
      if (err instanceof NoSourceError) {
        const output = makeNoSourceOutput(err)
        output.comments.forEach((comment) => this.comment(comment))
        this.redirect()
      } else if (err instanceof ParserError) {
        const output = makeParseErrorOutput(err)
        output.comments.forEach((comment) => this.comment(comment))
        this.redirect()
      }

      throw err
    }
  }

  private checkStructure(): void | never {
    const exported = extractExports(this.program).find(
      (extracted) => extracted.name === 'twoFer'
    )

    // First we check that there is a two-fer function and that this function
    // is exported.
    if (!this.mainMethod) {
      this.comment(NO_METHOD({ 'method.name': 'twoFer' }))
    } else if (!exported) {
      this.comment(NO_NAMED_EXPORT({ 'export.name': 'twoFer' }))
    }

    // If the main method's body is NOT a block statement, then it's likely an
    // ArrowFunctionExpression with inline return, such as:
    //
    // const twoFer = () => ...
    //
    // Any function that has a block as body MUST provide a value upon return:
    //
    // const twoFer = () => { ... }
    // function twoFer() { ... }
    //
    if (this.mainMethod?.body.type === AST_NODE_TYPES.BlockStatement) {
      const returnStatements = findAll(
        this.mainMethod.body,
        (node): node is ReturnStatement =>
          node.type === AST_NODE_TYPES.ReturnStatement
      )

      if (returnStatements.length === 0) {
        // In this case there isn't a single return statement, such as:
        //
        // const twoFer = () => { console.log(...) }
        //
        this.comment(NO_VALUE_RETURNED({ 'export.name': 'twoFer' }))
      } else if (
        !returnStatements.some((node) => guardReturnStatementWithValue(node))
      ) {
        // In this case there isn't a single return statement that returns a
        // value.
        this.comment(NO_VALUE_RETURNED({ 'export.name': 'twoFer' }))
      }
    }

    if (this.hasCommentary) {
      this.disapprove()
    }
  }

  private checkSignature(): void | never {
    // If there is no parameter or it doesn't have a default value,
    // then this solution won't pass the tests.
    if (this.mainMethod.params.length === 0) {
      this.disapprove(NO_PARAMETER({ 'function.name': this.mainMethod.name }))
    }

    const firstParameter = this.mainMethod.params[0]

    // If they provide a splat, the tests can pass but we should suggest they
    // use a real parameter.
    if (firstParameter.type === AST_NODE_TYPES.RestElement) {
      const splatArgName = parameterName(firstParameter)
      const splatArgType = annotateType(firstParameter.typeAnnotation)

      this.disapprove(
        UNEXPECTED_SPLAT_ARGS({
          'splat-arg.name': splatArgName,
          'parameter.type': splatArgType,
        })
      )
    }
  }

  private checkForOptimalSolutions(): void | never {
    // The optimal solution looks like this:
    //
    // export function twoFer(name = 'you') {
    //   return "One for #{name}, one for me."
    // }
    //
    // The default argument must be 'you', and it must just be a single
    // statement using interpolation, without any if statements or ternary
    // operators. Other solutions might be approved but this is the only
    // one that we would approve without comment.
    //
    // NOTE: the current tests are incorrect and want you to do name || 'you'

    if (
      !this.isDefaultArgumentOptimal() ||
      !this.isOneLineSolution() ||
      !this.isUsingTemplatedString()
    ) {
      // continue analyzing
      this.logger.log('~> Solution is not optimal')
      return
    }

    // If the interpolation has more than three components, then they've
    // done something weird, so let's get a mentor to look at it!
    if (!this.hasThreeComponentsInTemplateLiteral()) {
      this.redirect(REDIRECT_INCORRECT_STRING_TEMPLATE())
    }

    this.checkForTips()
    this.approve()
  }

  private checkForTips(): void | never {
    if (!this.hasInlineExport()) {
      this.comment(TIP_EXPORT_INLINE())
    }
  }

  private checkForApprovableSolutions(): void | never {
    // If we don't have a correct default argument or a one line
    // solution, then let's just get out of here.
    if (!this.isOneLineSolution()) {
      return
    }

    this.checkForSolutionWithFalsyDefault()

    if (!this.isDefaultArgumentOptimal()) {
      if (this.hasCommentary) {
        this.disapprove()
      }
      return
    }

    this.checkForSolutionWithoutStringTemplate()

    if (this.hasCommentary) {
      this.checkForTips()
      this.approve()
    } else {
      // If we have a one-line method that passes the tests, then it's not
      // something we've planned for, so let's refer it to a mentor
      this.redirect()
    }
  }

  private checkForSolutionWithoutStringTemplate(): void | never {
    const [expression] = findAll(this.mainMethod.node, guardBinaryExpression)

    //
    // "One for " + name + ", one for me."
    //
    if (
      guardBinaryExpression(expression, '+') &&
      (expression.left.type === AST_NODE_TYPES.Literal ||
        expression.right.type === AST_NODE_TYPES.Literal)
    ) {
      this.disapprove(PREFER_TEMPLATED_STRINGS())
    }
  }

  private checkForSolutionWithFalsyDefault(): void | never {
    //
    // "One for " + (name || 'you') + ", one for me."
    // `One for ${name || 'you'}, one for me.`
    //
    const expression = findFirstOfType<LogicalExpression>(
      this.mainMethod.node,
      AST_NODE_TYPES.LogicalExpression
    )

    if (
      expression &&
      guardLogicalExpression(expression, '||') &&
      guardIdentifier(expression.left)
    ) {
      if (
        guardLiteral(expression.right, 'you') ||
        guardTemplateLiteral(expression.right, ['you'])
      ) {
        const firstParameter = this.mainMethod.params[0]
        const parameter = parameterName(firstParameter, 'name')

        this.comment(
          OPTIMISE_EXPLICIT_DEFAULT_VALUE({
            parameter,
            maybe_undefined_expression: expression.left.name,
          })
        )
      }

      return
    }

    // `One for ${name ? name : 'you'}, one for me.`
    const conditionalExpression = findFirstOfType<ConditionalExpression>(
      this.mainMethod.node,
      AST_NODE_TYPES.ConditionalExpression
    )
    if (
      conditionalExpression &&
      guardIdentifier(conditionalExpression.test) &&
      conditionalExpression.consequent.type ===
        conditionalExpression.test.type &&
      conditionalExpression.consequent.name === conditionalExpression.test.name
    ) {
      if (
        guardLiteral(conditionalExpression.alternate, 'you') ||
        guardTemplateLiteral(conditionalExpression.alternate, ['you'])
      ) {
        const firstParameter = this.mainMethod.params[0]
        const parameter = parameterName(firstParameter, 'name')

        this.comment(
          OPTIMISE_EXPLICIT_DEFAULT_VALUE({
            parameter,
            maybe_undefined_expression: conditionalExpression.consequent.name,
          })
        )
      }
    }
  }

  private checkForConditionalOnDefaultArgument(): void | never {
    const conditionalExpressions = findAll<ConditionalExpression>(
      this.mainMethod.node,
      (node): node is ConditionalExpression =>
        node.type === AST_NODE_TYPES.ConditionalExpression
    )
    const ifStatements = findAll<IfStatement>(
      this.mainMethod.node,
      (node): node is IfStatement => node.type === AST_NODE_TYPES.IfStatement
    )

    if (
      (ifStatements.length === 0 && conditionalExpressions.length === 0) ||
      ifStatements.length + conditionalExpressions.length > 1
    ) {
      // If there are no ifs or ? : or if there is more than one, we have not
      // accounted for it so bail out.
      return
    }

    const defaultParameterName = parameterName(this.mainMethod.params[0])

    const [ifStatement] = ifStatements
    if (ifStatement) {
      const { test } = ifStatement

      // if (!name)
      if (
        guardUnaryExpression(test, '!') &&
        guardIdentifier(test.argument, defaultParameterName)
      ) {
        this.disapprove(
          OPTIMISE_DEFAULT_VALUE({ parameter: defaultParameterName })
        )
      }

      // if(name)
      if (guardIdentifier(test, defaultParameterName)) {
        this.disapprove(
          OPTIMISE_DEFAULT_VALUE({ parameter: defaultParameterName })
        )
      }

      // if (name === undefined)
      // if (undefined === name)
      // if (name !== undefined)
      // if (undefined !== name)
      // if (name === '')          => old test
      // if ('' === name)          => old test
      // if (name !== '')          => old test
      // if ('' !== name)          => old test
      if (
        (guardBinaryExpression(test, '===') ||
          guardBinaryExpression(test, '!==')) &&
        (guardIdentifier(test.left, defaultParameterName) ||
          guardIdentifier(test.right, defaultParameterName))
      ) {
        this.disapprove(
          OPTIMISE_DEFAULT_VALUE({ parameter: defaultParameterName })
        )
      }

      // if (name == false)
      // if (name == undefined)
      // if (name == null)
      // if (name == '')
      // if (false == name)
      // if (undefined == name)
      // if (null == name)
      // if ('' == name)
      // if (name != false)
      // if (name != undefined)
      // if (name != null)
      // if (name != '')
      // if (false != name)
      // if (undefined != name)
      // if (null != name)
      // if ('' != name)
      if (
        (guardBinaryExpression(test, '==') ||
          guardBinaryExpression(test, '!=')) &&
        (guardIdentifier(test.left, defaultParameterName) ||
          guardIdentifier(test.right, defaultParameterName))
      ) {
        this.comment(PREFER_STRICT_EQUALITY())
        this.disapprove(
          OPTIMISE_DEFAULT_VALUE({ parameter: defaultParameterName })
        )
      }

      // This has a conditional, but we don't know how to default with it
      this.redirect()
      return
    }

    const [{ consequent, alternate }] = conditionalExpressions

    // name ? name : 'you'
    // !name ? 'you' : 'name'
    // name ? name : `you`
    // !name ? `you` : 'name'
    if (
      (guardIdentifier(consequent) &&
        (guardLiteral(alternate, 'you') || guardTemplateLiteral(alternate))) ||
      (guardIdentifier(alternate) &&
        (guardLiteral(consequent, 'you') || guardTemplateLiteral(consequent)))
    ) {
      this.disapprove(
        OPTIMISE_DEFAULT_VALUE({ parameter: defaultParameterName })
      )
    }

    // name ? `One for ${name}, and one for me` : 'One for you, one for me.')
    // !name ? 'One for you, one for me.' : `One for ${name}, and one for me`
    if (
      (guardTemplateLiteral(consequent) &&
        (guardLiteral(alternate, 'One for you, one for me.') ||
          guardTemplateLiteral(alternate))) ||
      (guardTemplateLiteral(alternate) &&
        (guardLiteral(consequent, 'One for you, one for me.') ||
          guardTemplateLiteral(consequent)))
    ) {
      this.disapprove(
        OPTIMISE_DEFAULT_VALUE({ parameter: defaultParameterName })
      )
    }

    // This has a conditional, but we don't know how to default with it
    this.redirect()
  }

  private isDefaultArgumentOptimal(): boolean {
    return guardAssignmentPattern(this.mainMethod.params[0], 'you')
  }

  private isOneLineSolution(): boolean {
    // A one-line solution will never have any conditional expressions
    // (ternary operators) or if statements.
    const conditionalExpressions = findAll<ConditionalExpression>(
      this.mainMethod.node,
      (node): node is ConditionalExpression =>
        node.type === AST_NODE_TYPES.ConditionalExpression
    )
    const ifStatements = findAll<IfStatement>(
      this.mainMethod.node,
      (node): node is IfStatement => node.type === AST_NODE_TYPES.IfStatement
    )

    if (conditionalExpressions.length !== 0 || ifStatements.length !== 0) {
      return false
    }

    // Maximum body count may be 2 (3 - 1)
    //
    // 1: export function twoFer(name = 'you') {
    // 2:  return ...
    // 3: }
    //
    // but can also be less:
    //
    // 1: export const twoFer = (name = 'you') => ...
    //
    const body = this.mainMethod.body

    // This trick actually looks to the inner expression instead of the entire
    // function in order to allow for comments inside the body.
    const {
      loc: {
        start: { line: lineStart },
        end: { line: lineEnd },
      },
    } =
      body.type === AST_NODE_TYPES.BlockStatement &&
      body.body.length === 1 &&
      body.body[0].type === AST_NODE_TYPES.ReturnStatement
        ? body.body[0]
        : this.mainMethod.node

    return lineEnd - lineStart <= 2
  }

  private hasInlineExport(): boolean {
    // Additionally make sure the export is inline by checking if it doesn't
    // have any specifiers:
    //
    // export function gigasecond
    // => no specififers
    //
    // export { gigasecond }
    // => yes specififers
    //
    return !!extractExports(this.program).find(
      (extracted) =>
        extracted.exported === 'twoFer' && extracted.exportKind === 'value'
    )
  }

  private isUsingTemplatedString(): TemplateLiteral | undefined {
    return findFirstOfType<TemplateLiteral>(
      this.mainMethod.node,
      AST_NODE_TYPES.TemplateLiteral
    )
  }

  private hasThreeComponentsInTemplateLiteral(): boolean {
    const template = findFirstOfType<TemplateLiteral>(
      this.mainMethod.node,
      AST_NODE_TYPES.TemplateLiteral
    )
    return !!(
      template && template.quasis.length + template.expressions.length === 3
    )
  }
}

export default TwoFerAnalyzer
