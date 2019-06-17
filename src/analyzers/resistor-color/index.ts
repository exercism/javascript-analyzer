import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";
import { Program } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";

import { isReturnBlockStatement } from "~src/analyzers//utils/is_return_block_statement";
import { isReturnStatementWithValue } from "~src/analyzers//utils/is_return_statement_with_value";
import { AnalyzerImpl } from "~src/analyzers/AnalyzerImpl";
import { extractExport } from "~src/analyzers/utils/extract_export";
import { extractMainMethod, MainMethod } from "~src/analyzers/utils/extract_main_method";
import { parameterName } from '~src/analyzers/utils/extract_parameter';
import { findTopLevelConstants } from "~src/analyzers/utils/find_top_level_constants";
import { isCallExpression } from "~src/analyzers/utils/is_call_expression";
import { isIdentifier } from "~src/analyzers/utils/is_identifier";
import { annotateType } from "~src/analyzers/utils/type_annotations";
import { factory } from "~src/comments/comment";
import { NO_METHOD, NO_NAMED_EXPORT, NO_PARAMETER, UNEXPECTED_SPLAT_ARGS, PARSE_ERROR } from "~src/comments/shared";
import { AstParser, ParsedSource } from "~src/parsers/AstParser";
import { NoSourceError } from "~src/errors/NoSourceError";
import { ParserError } from "~src/errors/ParserError";

const TIP_EXPORT_INLINE = factory`
Did you know that you can export functions, classes and constants directly
inline?
`('javascript.resistor-color.export_inline')

const Parser: AstParser = new AstParser(undefined, 1)

const NOT_FOUND = {} as const

export class ResistorColorAnalyzer extends AnalyzerImpl {

  private program!: Program
  private source!: string

  private _mainMethod!: ReturnType<typeof extractMainMethod>
  private _mainConstant!: ReturnType<typeof findTopLevelConstants>[0] | typeof NOT_FOUND
  private _mainExports!: { function: ReturnType<typeof extractExport>; constant: ReturnType<typeof extractExport> }

  private get mainMethod(): ReturnType<typeof extractMainMethod> {
    if (!this._mainMethod) {
      this._mainMethod = extractMainMethod(this.program, 'colorCode')
    }
    return this._mainMethod
  }

  private get mainExports(): { function: ReturnType<typeof extractExport>; constant: ReturnType<typeof extractExport> } {
    if (!this._mainExports) {
      this._mainExports = {
        function: extractExport(this.program, 'colorCode'),
        constant: extractExport(this.program, 'COLORS')
      }
    }
    return this._mainExports
  }

  private get mainConstant(): ReturnType<typeof findTopLevelConstants>[0] | typeof NOT_FOUND {
    if (!this._mainConstant) {
      this._mainConstant = findTopLevelConstants(this.program, ['let', 'const', 'var']).find(
        ({ declarations }): boolean => !!declarations.find((declaration): boolean => {
          return isIdentifier(declaration.id, 'COLORS')
        })
      ) || NOT_FOUND
    }

    return this._mainConstant
  }

  public async execute(input: Input): Promise<void> {
    const [parsed] = await this.parse(input)

    this.program = parsed.program
    this.source = parsed.source

    // Firstly we want to check that the structure of this solution is correct
    // and that there is nothing structural stopping it from passing the tests
    this.checkStructure()

    // Now we want to ensure that the method signature is sane and that it has
    // valid arguments
    this.checkSignature()

    // There are a handful optimal solutions for resistor-color which needs no
    // comments and can just be approved. If we have it, then let's just
    // acknowledge it and get out of here.
    this.checkForOptimalSolutions()

    // The solution is automatically referred to the mentor if it reaches this
  }

  private async parse(input: Input): never | Promise<ParsedSource[]> {
    try {
      return await Parser.parse(input)
    } catch (err) {
      if (err instanceof NoSourceError) {
        this.logger.error(`=> [NoSourceError] ${err.message}`)
        this.redirect()
      }

      if (err instanceof ParserError) {
        this.logger.error(`=> [ParserError] ${err.message}`)
        const { message, ...details } = err.original
        this.disapprove(PARSE_ERROR({ error: message, details: JSON.stringify(details) }))
      }

      throw err
    }
  }

  private checkStructure(): void | never {
    const method = this.mainMethod
    const { function: [functionDeclaration,], constant: [constantDeclaration, ] } = this.mainExports

    // First we check that there is a two-fer function and that this function
    // is exported.
    if (!method) {
      this.comment(NO_METHOD({ 'method.name': 'colorCode' }))
    }

    if (!functionDeclaration) {
      this.comment(NO_NAMED_EXPORT({ 'export.name': 'colorCode' }))
    }

    if (!constantDeclaration) {
      this.comment(NO_NAMED_EXPORT({ 'export.name': 'COLORS' }))
    }

    if (this.hasCommentary) {
      this.disapprove()
    }
  }

  private checkSignature(): void | never {
    const method: MainMethod = this.mainMethod!

    // If there is no parameter
    // then this solution won't pass the tests.
    if (method.params.length === 0) {
      this.disapprove(NO_PARAMETER({ 'function.name': method.id!.name }))
    }

    const firstParameter = method.params[0]

    // If they provide a splat, the tests can pass but we should suggest they
    // use a real parameter.
    if (firstParameter.type === AST_NODE_TYPES.RestElement) {
      const splatArgName = parameterName(firstParameter)
      const splatArgType = annotateType(firstParameter.typeAnnotation)

      this.disapprove(UNEXPECTED_SPLAT_ARGS({
        'splat-arg.name': splatArgName,
        'parameter.type': splatArgType
      }))
    }
  }

  private checkForOptimalSolutions(): void | never {
    // The optional solution looks like this:
    //
    // export const COLORS = ['...', '...']
    // export function colorCode(color) {
    //   return COLORS.indexOf(color)
    // }
    //
    // The COLORS constant must be an Array and there must be a single call to
    // indexOf. Additionally, the function can not have a default argument, or
    // any other syntax, such as conditionals, re-assignment, and so forth.
    //
    // Other solutions might be approved but this
    // is the only one that we would approve without comment.
    //

    if (
    // !this.isArgumentOptimal()
      !this.isOneCallSolution()
      // || !this.isUsingArrayColors()
      // || !this.isUsingIndexOf()
    ) {
      // continue analyzing
      this.logger.log('~> Solution is not optimal')
      return
    }

    this.checkForTips()
    this.approve()
  }

  private checkForTips(): void | never {
    if (!this.hasInlineExport()) {
      this.comment(TIP_EXPORT_INLINE())
    }
  }

  private isOneCallSolution(): boolean | never {
    // Maximum body count may be 3 (3 - 1 + 1)
    //
    // 1: export function colorCode(color) {
    // 2:  return ...
    // 3: }
    //
    // but can also be less 1 (1 - 1 + 1)
    //
    // 1: export const colorCode = (color) => ...
    //
    const method: MainMethod = this.mainMethod!
    const body = method.body!

    // This trick actually looks to the inner exppresion instead of the entire
    // function in order to allow for comments inside the body.
    const { loc: { start: { line: lineStart }, end: { line: lineEnd } } } =
      isReturnBlockStatement(body)
        ? body.body[0]
        : method

    this.logger.log(`=> Body consists of ${lineEnd - lineStart + 1} lines and is a ${method.type}.`)

    if ((lineEnd - lineStart + 1) > 3) {
      return false
    }

    // There can only be a single call to COLORS.indexOf and there may not be
    // an other tokens, whatsoever. The following checks are only testing the
    // optimal variations.

    // function colorCode(color) { return COLORS.indexOf(color) }
    //
    if (method.type === AST_NODE_TYPES.FunctionDeclaration) {
      this.logger.log(`=> The Function Declaration has ${method.params.length} argument(s)`)

      if (method.params.length !== 1) {
        return false
      }

      const functionParameter = method.params[0]
      const callExpression = method.body
        && isReturnBlockStatement(method.body)
        && isReturnStatementWithValue(method.body.body[0])
        && isCallExpression(method.body.body[0].argument, 'COLORS', 'indexOf')
        && method.body.body[0].argument

      return !!(
        isIdentifier(functionParameter)
        && callExpression
        && isIdentifier(callExpression.arguments[0], functionParameter.name)
      )
    }

    // const colorCode = (color) => COLORS.indexOf(color)
    // const colorCode = (color) => { return COLORS.indexOf(color) }
    //
    if (method.type === AST_NODE_TYPES.ArrowFunctionExpression) {
      this.logger.log(`=> The Arrow Function Expression has ${method.params.length} argument(s)`)

      if (method.params.length !== 1) {
        return false
      }

      const functionParameter = method.params[0]

      // First test/option is the implicit return
      // Second test/option is the explicit return
      //
      const callExpression = (isCallExpression(body, 'COLORS', 'indexOf') && body)
        || (
          isReturnBlockStatement(body)
          && isReturnStatementWithValue(body.body[0])
          && isCallExpression(body.body[0].argument, 'COLORS', 'indexOf')
          && body.body[0].argument
        )

      return isIdentifier(functionParameter)
        && callExpression
        && isIdentifier(callExpression.arguments[0], functionParameter.name)
    }

    // const colorCode = function (color) { return COLORS.indexOf(color) }
    //
    if (method.type === AST_NODE_TYPES.FunctionExpression) {
      this.logger.log(`=> The Function Expression has ${method.params.length} argument(s)`)

      if (method.params.length > 1) {
        return false
      }

      const functionParameter = method.params[0]
      const callExpression = body
        && isReturnBlockStatement(body)
        && isReturnStatementWithValue(body.body[0])
        && isCallExpression(body.body[0].argument, 'COLORS', 'indexOf')
        && body.body[0].argument

      return isIdentifier(functionParameter)
        && callExpression
        && isIdentifier(callExpression.arguments[0], functionParameter.name)
    }

    // Should _never_ happen
    this.logger.log(`=> The body failed all the stuctural tests. It's a ${method!.type}.`)
    // Bail out
    return this.redirect()
  }

  private hasInlineExport(): boolean  {
    // Additionally make sure the export is inline by checking if it doesn't
    // have any specifiers:
    //
    // export function value
    // => no specififers
    //
    // export { value }
    // => yes specififers
    //
    return this.mainExports.function[0]!.specifiers
      && this.mainExports.function[0]!.specifiers.length === 0
      && this.mainExports.constant[0]!.specifiers
      && this.mainExports.constant[0]!.specifiers.length === 0
  }
}

