import {
  BinaryExpression,
  ConditionalExpression,
  IfStatement,
  LogicalExpression,
  Program,
  TemplateLiteral,
  Parameter
} from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"
import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree"

import { BaseAnalyzer } from "../base_analyzer"

import { extractAll } from "../utils/extract_all"
import { extractExport } from "../utils/extract_export"
import { extractFirst } from "../utils/extract_first"
import { extractMainMethod, MainMethod } from "../utils/extract_main_method"

import { factory } from "../../comments/comment"
import {
  NO_METHOD,
  NO_NAMED_EXPORT,
  UNEXPECTED_SPLAT_ARGS,
  PREFER_TEMPLATED_STRINGS,
  PREFER_STRICT_EQUALITY,
  NO_PARAMETER,
} from "../../comments/shared"

import { parameterName } from '../utils/extract_parameter'
import { annotateType } from "../utils/type_annotations"

const OPTIMISE_DEFAULT_VALUE = factory<'parameter'>`
You currently use a conditional to branch in case there is no value passed into
\`twoFer\`. Instead you could set the [default value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters)
of ${'parameter'} to 'you' to avoid this conditional.
`('javascript.two-fer.optimise_default_value')

const OPTIMISE_EXPLICIT_DEFAULT_VALUE = factory<'parameter' | 'maybe_undefined_expression'>`
Instead of relying on ${'maybe_undefined_expression'} being "undefined" when
no value is passed in, you could set the default value of '${'parameter'}' to
'you'.
`('javascript.two-fer.optimise_explicity_default_value')

const REDIRECT_INCORRECT_STRING_TEMPLATE = factory`
The string template looks incorrect. Expected a template with 3 components.
`('javascript.two-fer.redirect_incorrect_string_template')

const TIP_EXPORT_INLINE = factory`
Did you know that you can export functions, classes and constants directly
inline?
`('javascript.two-fer.export_inline')

export class TwoFerAnalyzer extends BaseAnalyzer {

  private program!: Program
  private source!: string

  private _mainMethod!: ReturnType<typeof extractMainMethod>
  private _mainExport!: ReturnType<typeof extractExport>

  private _mainParameter!: Parameter

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

  get mainParameter() {
    if (!this._mainParameter) {
      this._mainParameter = this.mainMethod!.params[0]
    }

    return this._mainParameter
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
      this.comment(NO_METHOD({ method_name: 'twoFer' }))
    }

    if (!declaration) {
      this.comment(NO_NAMED_EXPORT({ export_name: 'twoFer' }))
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
      this.disapprove(NO_PARAMETER({ function_name: method.id!.name }))
    }

    const firstParameter = this.mainParameter!

    // If they provide a splat, the tests can pass but we should suggest they
    // use a real parameter.
    if (firstParameter.type === AST_NODE_TYPES.RestElement) {
      const splatArgName = parameterName(firstParameter)
      const splatArgType = annotateType(firstParameter.typeAnnotation)

      this.disapprove(UNEXPECTED_SPLAT_ARGS({ 'splat_arg_name': splatArgName, parameter_type: splatArgType }))
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
      this.logger.log('~> Solution is not optimal')
      return
    }

    // If the interpolation has more than three components, then they've
    // done something weird, so let's get a mentor to look at it!
    if (!this.hasThreeComponentsInTemplateLiteral()) {
      this.redirect(REDIRECT_INCORRECT_STRING_TEMPLATE())
    }

    this.approve()
  }

  private checkForLateExport() {
    if (this.mainExport[1]!.type === AST_NODE_TYPES.ExportSpecifier) {
      this.comment(TIP_EXPORT_INLINE())
    }
  }

  private checkForApprovableSolutions() {
    // If we don't have a correct default argument or a one line
    // solution then let's just get out of here.
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
      this.comment(PREFER_TEMPLATED_STRINGS())
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
    ) {

      if (
        (
             expression.right.type === AST_NODE_TYPES.Literal
          && expression.right.value === 'you'
        ) || (
             expression.right.type === AST_NODE_TYPES.TemplateLiteral
          && expression.right.quasis[0]
          && expression.right.quasis[0].value.raw === 'you'
        )
      ) {
        const firstParameter = this.mainMethod!.params[0]
        const parameter =
            firstParameter.type === AST_NODE_TYPES.AssignmentPattern
          && firstParameter.left.type === AST_NODE_TYPES.Identifier
          && firstParameter.left.name
          || 'name'


        this.comment(OPTIMISE_EXPLICIT_DEFAULT_VALUE({
          parameter,
          maybe_undefined_expression: expression.left.name
        }))
      }

      return
    }


    // `One for ${name ? name : 'you'}, one for me.`
    const conditionalExpression = extractFirst<ConditionalExpression>(this.mainMethod!, AST_NODE_TYPES.ConditionalExpression)
    if (
         conditionalExpression
      && conditionalExpression.test.type === AST_NODE_TYPES.Identifier
      && conditionalExpression.consequent.type === conditionalExpression.test.type
      && conditionalExpression.consequent.name === conditionalExpression.test.name
     ) {

      if (
        (
             conditionalExpression.alternate.type === AST_NODE_TYPES.Literal
          && conditionalExpression.alternate.value === 'you'
        ) || (
             conditionalExpression.alternate.type === AST_NODE_TYPES.TemplateLiteral
          && conditionalExpression.alternate.quasis[0]
          && conditionalExpression.alternate.quasis[0].value.raw === 'you'
        )
      ) {
        const firstParameter = this.mainMethod!.params[0]
        const parameter =
            firstParameter.type === AST_NODE_TYPES.AssignmentPattern
          && firstParameter.left.type === AST_NODE_TYPES.Identifier
          && firstParameter.left.name
          || 'name'

        this.comment(OPTIMISE_EXPLICIT_DEFAULT_VALUE({
          parameter,
          maybe_undefined_expression: conditionalExpression.consequent.name
        }))
      }
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

    const defaultParameterName = parameterName(this.mainParameter)

    const [ifStatement] = ifStatements
    if (ifStatement) {
      const { test } = ifStatement

      // if (!name)
      if (
           test.type === AST_NODE_TYPES.UnaryExpression
        && test.operator === "!"
        && test.argument.type === AST_NODE_TYPES.Identifier
        && test.argument.name === defaultParameterName
      ) {
        this.disapprove(OPTIMISE_DEFAULT_VALUE({ parameter: defaultParameterName }))
      }

      // if(name)
      if (
           test.type === AST_NODE_TYPES.Identifier
        && test.name === defaultParameterName
      ) {
        this.disapprove(OPTIMISE_DEFAULT_VALUE({ parameter: defaultParameterName }))
      }

      // if (name === undefined)
      // if (undefined === name)
      // if (name === '')           => old test
      // if ('' ==== name)          => old test
      if (
        test.type === AST_NODE_TYPES.BinaryExpression
        && test.operator === "==="
        && (
             (test.left.type === AST_NODE_TYPES.Identifier && test.left.name === defaultParameterName)
          || (test.right.type === AST_NODE_TYPES.Identifier  && test.right.name === defaultParameterName)
        )
      ) {
        this.disapprove(OPTIMISE_DEFAULT_VALUE({ parameter: defaultParameterName }))
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
           test.type === AST_NODE_TYPES.BinaryExpression
        && test.operator === "=="
        && (
             (test.left.type === AST_NODE_TYPES.Identifier && test.left.name === defaultParameterName)
          || (test.right.type === AST_NODE_TYPES.Identifier && test.right.name === defaultParameterName)
        )
      ) {
        this.comment(PREFER_STRICT_EQUALITY())
        this.disapprove(OPTIMISE_DEFAULT_VALUE({ parameter: defaultParameterName }))
      }

      // This has a conditional, but we don't know how to default with it
      this.redirect()

      return
    }

    const [{ consequent, alternate }] = conditionalExpressions

    // name ? name : 'you'
    if (
         (consequent.type === AST_NODE_TYPES.Literal && alternate.type === AST_NODE_TYPES.Identifier)
      || (consequent.type === AST_NODE_TYPES.Identifier && alternate.type === AST_NODE_TYPES.Literal)
    ) {
      this.disapprove(OPTIMISE_DEFAULT_VALUE({ parameter: defaultParameterName }))
    }

    // name ? `One for ${name}, and one for me` : 'One for you, and one for me')
    if (
         consequent.type === AST_NODE_TYPES.TemplateLiteral
      && (alternate.type === AST_NODE_TYPES.TemplateLiteral || alternate.type === AST_NODE_TYPES.Literal)
    ) {
      this.disapprove(OPTIMISE_DEFAULT_VALUE({ parameter: defaultParameterName }))
    }

    // This has a conditional, but we don't know how to default with it
    this.redirect()
  }

  private isDefaultArgumentOptimal() {
    const parameter = this.mainParameter
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
    const body = this.mainMethod!.body!

    // This trick actually looks to the inner exppresion instead of the entire
    // function in order to allow for comments inside the body.
    const { loc: { start: { line: lineStart }, end: { line: lineEnd } } } =
         body.type === AST_NODE_TYPES.BlockStatement
      && body.body.length === 1
      && body.body[0].type === AST_NODE_TYPES.ReturnStatement
       ? body.body[0]
       : this.mainMethod!

    return (lineEnd - lineStart) <= 2
      // Additionally make sure the export is inline by checking if it doesn't
      // have any specifiers:
      //
      // export function twoFer
      // => no specififers
      //
      // export { twoFer }
      // => yes specififers
      //
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

