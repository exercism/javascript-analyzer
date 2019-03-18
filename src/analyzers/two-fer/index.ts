import { BaseAnalyzer } from "../base_analyzer"
import { extractMainMethod, MainMethod } from "../generic/extract_main_method"
import { factory } from "../comment"
import { extractExport } from "../generic/extract_export";
import { Program, TemplateLiteral, BinaryExpression, LogicalExpression, IfStatement, ConditionalExpression } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import { extractAll } from "../generic/extract_all";
import { extractFirst } from "../generic/extract_first";

const COMMENTS = {
  no_method: factory`No method called ${'name'}`,
  no_export: factory`No es6 export called ${'name'}`,
  splat_args: factory`Rather than using ...${'splat_arg'}, how about actually setting a parameter called 'name'?`,
  missing_default_param: factory`There is no correct default param - the tests will fail`,
  incorrect_default_param: factory`You could set the default value to 'you' to avoid conditionals`,
  string_concatenation: factory`Rather than using string concatenation, use interpolation`,
  string_template_looks_incorrect: factory`Expected string template with 3 components`,
  default_param_vs_falsy_value: factory`Instead of relying on ${'first_arg'} being undefined, you could set the default value of the parameter to 'you'`,
  strict_equality: factory`In JavaScript, always prefer strict equality (=== and !==) over == and != in order to guard against implicit type coercion`,
  export_inline: factory`Did you know that you can export functions, classes and constants directly inline?`,
  es6_exports: factory`Use the export keyword instead of module.exports`
}

export class TwoFerAnalyzer extends BaseAnalyzer {

  private program!: Program
  private source!: string

  private _mainMethod!: ReturnType<typeof extractMainMethod>
  private _mainExport!: ReturnType<typeof extractExport>

  get mainMethod() {
    if (!this._mainMethod) {
      this._mainMethod = extractMainMethod(this.program, 'twoFer')
    }
    return this._mainMethod
  }

  get mainExport() {
    if (!this._mainExport) {
      this._mainExport = extractExport(this.program, 'twoFer')
    }
    return this._mainExport
  }

  public async execute(): Promise<void> {
    const [parsed] = await TwoFerAnalyzer.parse(this.solution)

    this.program = parsed.program
    this.source = parsed.source

    // Firstly we want to check that the structure of this solution is correct
    // and that there is nothing structural stopping it from passing the tests
    this.checkStructure()

    // Now we want to ensure that the method signature is sane and that it has
    // valid arguments
    this.checkSignature()

    // There are a handful optimal solutions for two-fer which needs no comments
    // and can just be approved. If we have it, then let's just acknowledge it
    // and get out of here.
    this.checkForOptimalSolutions()

    // Some students don't export the function inline. They might not know about
    // inline exporting because they're still used to module.exports = {}
    this.checkForLateExport()

    // We often see solutions that are correct but use different string
    // concatenation options (e.g. String#+, Array#join, etc). We'll approve
    // these but want to leave a comment that introduces them to string
    // templates in case they don't know about it.
    //
    // Additionally there are correct solutions which don't use the default
    // argument but instead rely of the falsy nature of undefined. We'll approve
    // these but want to leave a comment that introduces them to string
    // templates in case they don't know about it.
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

  private checkStructure() {
    const method = this.mainMethod
    const [declaration,] = this.mainExport

    // First we check that there is a two-fer function and that this function
    // is exported.
    if (!method) {
      this.comment(COMMENTS.no_method({ name: 'twoFer' }))
    }

    if (!declaration) {
      this.comment(COMMENTS.no_export({ name: 'twoFer' }))
    }

    if (this.hasCommentary) {
      this.disapprove()
    }
  }

  private checkSignature() {
    const method: MainMethod = this.mainMethod!

    // If there is no parameter or it doesn't have a default value,
    // then this solution won't pass the tests.
    if (method.params.length === 0) {
      this.disapprove(COMMENTS.missing_default_param())
    }

    // If they provide a splat, the tests can pass but we should suggest they
    // use a real parameter.
    const firstParameter = method.params[0]
    if (firstParameter.type === AST_NODE_TYPES.RestElement) {
      const splat_arg = firstParameter.argument.type === AST_NODE_TYPES.Identifier && firstParameter.argument.name || undefined
      this.disapprove(COMMENTS.splat_args({ splat_arg }))
    }
  }

  private checkForOptimalSolutions() {
    // The optional solution looks like this:
    //
    // export function twoFer(name = 'you') {
    //   return "One for #{name}, one for me."
    // }
    //
    // The default argument must be 'you', and it must just be a single
    // statement using interpolation. Other solutions might be approved but this
    // is the only one that we would approve without comment.
    //
    // NOTE: the current tests are incorrect and want you to do name || 'you'

    if (
         !this.isDefaultArgumentOptimal()
      || !this.isOneLineSolution()
      || !this.isUsingTemplatedString()
    ) {
      // continue analyzing
      return
    }

    // If the interpolation has more than three components, then they've
    // done something weird, so let's get a mentor to look at it!
    if (!this.hasThreeComponentsInTemplateLiteral()) {
      this.redirect(COMMENTS.string_template_looks_incorrect())
    }

    this.approve()
  }

  private checkForLateExport() {
    if (this.mainExport[1]!.type === AST_NODE_TYPES.ExportSpecifier) {
      this.comment(COMMENTS.export_inline())
    }
  }

  private checkForApprovableSolutions() {
    // If we don't have a correct default argument or a one line
    // solution then let's just get out of here.
    if (!this.isOneLineSolution()) {
      return
    }

    this.checkForSolutionWithFalsyDefault()

    if ( !this.isDefaultArgumentOptimal()) {
      if (this.hasCommentary) {
        this.approve()
      }
      return
    }

    this.checkForSolutionWithoutStringTemplate()

    if (this.hasCommentary) {
      this.approve()
    } else {
      // If we have a one-line method that passes the tests, then it's not
      // something we've planned for, so let's refer it to a mentor
      this.redirect()
    }
  }

  private checkForSolutionWithoutStringTemplate() {
    const [expression] = extractAll<BinaryExpression>(this.mainMethod!, AST_NODE_TYPES.BinaryExpression)

    //
    // "One for " + name + ", one for me."
    //
    if (
         expression
      && expression.operator === '+'
      && (
           expression.left.type === AST_NODE_TYPES.Literal
        || expression.right.type === AST_NODE_TYPES.Literal
      )
    ) {
      this.comment(COMMENTS.string_concatenation())
    }
  }

  private checkForSolutionWithFalsyDefault() {
    // This is correct in current version; but we need to update the exercise so
    // this is implemented as if it is.
    //
    // "One for " + (name || 'you') + ", one for me."
    // `One for ${name || 'you'}, one for me.`
    //
    const expression = extractFirst<LogicalExpression>(this.mainMethod!, AST_NODE_TYPES.LogicalExpression)
    if (
         expression
      && expression.operator === '||'
      && expression.left.type === AST_NODE_TYPES.Identifier
      && expression.right.type === AST_NODE_TYPES.Literal
      && expression.right.value === 'you'
    ) {
      this.comment(COMMENTS.default_param_vs_falsy_value({ 'first_arg': expression.left.name }))
    }
  }

  private checkForConditionalOnDefaultArgument() {
    const conditionalExpressions = extractAll<ConditionalExpression>(this.mainMethod!, AST_NODE_TYPES.ConditionalExpression)
    const ifStatements = extractAll<IfStatement>(this.mainMethod!, AST_NODE_TYPES.IfStatement)

    if (
         ifStatements.length === 0
      && conditionalExpressions.length === 0
      || (ifStatements.length + conditionalExpressions.length > 1)
    ) {
      // If there are no ifs or ? : or if there is more than one, we have not
      // accounted for it so bail out.
      return
    }

    const [ifStatement] = ifStatements
    if (ifStatement) {
      // if (!name)
      if (
           ifStatement.test.type === AST_NODE_TYPES.UnaryExpression
        && ifStatement.test.operator === "!"
        && ifStatement.test.argument.type === AST_NODE_TYPES.Identifier
      ) {
        this.disapprove(COMMENTS.incorrect_default_param())
      }

      // if (name === undefined)
      // if (undefined === name)
      // if (name === '')           => old test
      // if ('' ==== name)          => old test
      if (
        ifStatement.test.type === AST_NODE_TYPES.BinaryExpression
        && ifStatement.test.operator === "==="
        && ifStatement.test.left.type === AST_NODE_TYPES.Identifier
        && ifStatement.test.right.type === AST_NODE_TYPES.Identifier
        && [ifStatement.test.left.name, ifStatement.test.right.name].includes('undefined')
      ) {
        this.disapprove(COMMENTS.incorrect_default_param())
      }

      // if (name == false)
      // if (name == undefined)
      // if (name == null)
      // if (name == '')
      // if (false == name)
      // if (undefined == name)
      // if (null == name)
      // if ('' == name)
      if (
        ifStatement.test.type === AST_NODE_TYPES.BinaryExpression
        && ifStatement.test.operator === "=="
        && [ifStatement.test.left.type, ifStatement.test.right.type].includes(AST_NODE_TYPES.Identifier)
      ) {
        this.comment(COMMENTS.strict_equality())
        this.disapprove(COMMENTS.incorrect_default_param())
      }

      return
    }

    const [{ consequent, alternate }] = conditionalExpressions
    if (
         (consequent.type === AST_NODE_TYPES.Literal && alternate.type === AST_NODE_TYPES.Identifier)
      || (consequent.type === AST_NODE_TYPES.Identifier && alternate.type === AST_NODE_TYPES.Literal)
    ) {
      this.disapprove(COMMENTS.incorrect_default_param())
    }
  }

  private isDefaultArgumentOptimal() {
    const parameter = this.mainMethod!.params[0]
    return parameter.type === AST_NODE_TYPES.AssignmentPattern
      && parameter.right
      && parameter.right.type === AST_NODE_TYPES.Literal
      && parameter.right.value === 'you'
  }

  private isOneLineSolution() {
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
    const { loc: { start: { line: lineStart }, end: { line: lineEnd } } } = this.mainMethod!

    // Additionally make sure the export is inline by checking if it doesn't
    // have any specifiers:
    //
    // export function twoFer
    // => no specififers
    //
    // export { twoFer }
    // => yes specififers
    //
    return (lineEnd - lineStart) <= 2
      && this.mainExport[0]!.specifiers.length === 0
  }

  private isUsingTemplatedString() {
    return extractFirst<TemplateLiteral>(this.mainMethod!, AST_NODE_TYPES.TemplateLiteral)
  }

  private hasThreeComponentsInTemplateLiteral() {
    const template = extractFirst<TemplateLiteral>(this.mainMethod!, AST_NODE_TYPES.TemplateLiteral)
    return template
      && template.quasis.length + template.expressions.length === 3
  }
}

