import { AST_NODE_TYPES } from "@typescript-eslint/typescript-estree"
import { Identifier, Node, Program, VariableDeclarator } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree"

import { Traverser } from "eslint/lib/util/traverser"

import { AnalyzerImpl } from "../AnalyzerImpl"
import { factory } from "../../comments/comment"

import { extractExport } from "../utils/extract_export"
import { extractMainMethod, MainMethod } from "../utils/extract_main_method"
import { parameterName } from '../utils/extract_parameter'
import { findAll } from "../utils/find_all"
import { findFirst } from "../utils/find_first"
import { findFirstOfType } from "../utils/find_first_of_type"
import { isNewExpression } from "../utils/find_new_expression"
import { findRawLiteral } from "../utils/find_raw_literal"
import { findTopLevelConstants } from "../utils/find_top_level_constants"
import { isBinaryExpression } from "../utils/is_binary_expression"
import { isCallExpression } from "../utils/is_call_expression"
import { isIdentifier } from "../utils/is_identifier"
import { isLiteral } from "../utils/is_literal"

import { NO_METHOD, NO_NAMED_EXPORT, NO_PARAMETER, UNEXPECTED_PARAMETER } from "../../comments/shared";
import { AstParser } from "../../parsers/AstParser";

const TIP_EXPORT_INLINE = factory<'method_signature' | 'const_name'>`
Did you know that you can export functions, classes and constants directly
inline?
\`\`\`javascript
export const ${'const_name'} = ...

export ${'method_signature'}
\`\`\`
`('javascript.gigasecond.export_inline')

const PREFER_NUMBER_COMPREHENSION = factory<'literal'>`
You can rewrite the literal \`${'literal'}\` using \`Math.pow\` or \`10 ** n\`,
which makes it more readable.
`('javascript.gigasecond.prefer_number_comprehension')

const PREFER_TOP_LEVEL_CONSTANT = factory<'value' | 'name'>`
Consider extracting the gigasecond number into a constant:

\`\`\`javascript
const ${'name'} = ${'value'}

export const gigasecond = (...)
\`\`\`
`('javascript.gigasecond.prefer_top_level_constant')


export class GigasecondAnalyzer extends AnalyzerImpl {

  static Parser: AstParser = new AstParser(undefined, 1)

  private program!: Program
  private source!: string

  private _mainMethod!: ReturnType<typeof extractMainMethod>
  private _mainExport!: ReturnType<typeof extractExport>

  // Typed as Identifier because that's the only expected type. When checking
  // the signature, make sure it _does_ check if this is an identifier.
  private _mainParameter!: Identifier
  private memoized: { [P: string]: any } = {};

  get mainMethod() {
    if (!this._mainMethod) {
      this._mainMethod = extractMainMethod(this.program, 'gigasecond')
    }
    return this._mainMethod
  }

  get mainExport() {
    if (!this._mainExport) {
      this._mainExport = extractExport(this.program, 'gigasecond')
    }
    return this._mainExport
  }

  get mainParameter() {
    if (!this._mainParameter) {
      this._mainParameter = this.mainMethod!.params[0] as Identifier
    }

    return this._mainParameter
  }

  public async execute(input: Input): Promise<void> {
    const [parsed] = await GigasecondAnalyzer.Parser.parse(input)

    this.program = parsed.program
    this.source = parsed.source

    this.memoized = {}

    // Firstly we want to check that the structure of this solution is correct
    // and that there is nothing structural stopping it from passing the tests
    this.checkStructure()

    // Now we want to ensure that the method signature is sane and that it has
    // valid arguments
    this.checkSignature()

    // There are a handful optimal solutions for gigasecond which needs no
    // comments and can just be approved. If we have it, then let's just
    // acknowledge it and get out of here.
    this.checkForOptimalSolutions()

    // The solution might not be optimal but still be approvable. Check these
    // first and bail-out (with approval) if that's the case.
    this.checkForApprovableSolutions()

    // Time to find sub-optimal code.

    // The solution is automatically referred to the mentor if it reaches this
  }

  private checkStructure() {
    const method = this.mainMethod
    const [declaration,] = this.mainExport

    // First we check that there is a gigasecond function and that this function
    // is exported.
    if (!method) {
      this.comment(NO_METHOD({ method_name: 'gigasecond' }))
    }

    if (!declaration) {
      this.comment(NO_NAMED_EXPORT({ export_name: 'gigasecond' }))
    }

    if (this.hasCommentary) {
      this.disapprove()
    }
  }

  private checkSignature() {
    const method: MainMethod = this.mainMethod!

    // If there is no parameter then this solution won't pass the tests.
    if (method.params.length === 0) {
      this.disapprove(NO_PARAMETER({ function_name: method.id!.name }))
    }

    const firstParameter = this.mainParameter!

    // If this is not a simple parameter, but something else such as a splat,
    // or a parameter with a default argument, bail out and refer to mentor.
    if (firstParameter.type !== AST_NODE_TYPES.Identifier) {
      this.redirect(UNEXPECTED_PARAMETER({ type: firstParameter.type }))
    }
  }

  private checkForOptimalSolutions() {
    // The optional solution looks like this:
    //
    // const GIGASECOND_IN_MS = 10 ** 9
    //
    // export function gigasecond(input) {
    //   return new Date(input.getTime() + GIGASECOND_IN_MS)
    // }
    //
    // It does not modify the input, it does not use `setXXX`, it extracts the
    // large number into a const and it uses Math.pow or ** to write the large
    // number.
    //

    if (
         !this.isOneLineSolution()
      || !this.isUsingGetTimeOnce()
      || !this.isUsingNewDateOnce()
      || !this.findExtractedNumberConstant()
      || this.isUsingLargeNumberLiteral()
      || this.isUsingIntermediateVariable()
    ) {
      // continue analyzing
      this.logger.log('~> Solution is not optimal')
      this.logger.log(JSON.stringify({
        isOneLineSolution: this.isOneLineSolution(),
        isUsingGetTimeOnce: !!this.isUsingGetTimeOnce(),
        isUsingNewDateOnce: !!this.isUsingNewDateOnce(),
        findExtractedNumberConstant: !!this.findExtractedNumberConstant(),
        isUsingLargeNumberLiteral: !!this.isUsingLargeNumberLiteral(),
        isUsingIntermediateVariable: !!this.isUsingIntermediateVariable()
      }, null, 2))
      return
    }

    this.checkForTips()
    this.approve()
  }

  private checkForTips() {
    const optimizeLargeNumber = this.isUsingLargeNumberLiteral()
    const numberComprehension = this.findNumberComprehension()
    const extracted = this.findExtractedNumberConstant()

    if (extracted === undefined) {
      // Should extract into constant
      this.comment(
        PREFER_TOP_LEVEL_CONSTANT({
          name: 'GIGASECOND_IN_MS',
          value: '1000000000000',
        })
      )
    }

    if (optimizeLargeNumber) {
      // Should use Math.pow(10, 12) or 10 ** 12
      this.comment(
        PREFER_NUMBER_COMPREHENSION({
          literal: '1000000000000'
        })
      )
    }

    if (!this.hasInlineExport()) {
      // export { gigasecond }
      const gigasecondConstant = this.findExtractedNumberConstant()
      this.comment(
        TIP_EXPORT_INLINE({
          method_signature: 'function gigasecond(...) { ... }',
          const_name: gigasecondConstant && parameterName(gigasecondConstant) || 'MY_CONST'
        })
      )
    }
  }

  private checkForApprovableSolutions() {
    if (!this.isOneLineSolution()) {
      return
    }

    if (!this.isUsingGetTimeOnce() || !this.isUsingNewDateOnce()) {
      return
    }

    this.checkForTips()
    this.approve()
  }

  private isOneLineSolution() {
    // Maximum body count may be 2 (3 - 1)
    //
    // 1: export function gigasecond(input) {
    // 2:  return ...
    // 3: }
    //
    // but can also be less:
    //
    // 1: export const gigasecond = (input) => ...
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
  }

  private hasInlineExport() {
    // Additionally make sure the export is inline by checking if it doesn't
    // have any specifiers:
    //
    // export function gigasecond
    // => no specififers
    //
    // export { gigasecond }
    // => yes specififers
    //
    return this.mainExport[0]!.specifiers && this.mainExport[0]!.specifiers.length === 0
  }

  private isUsingGetTimeOnce() {
    const { name } = this.mainParameter
    return findAll(this.mainMethod!, (node) => isCallExpression(node, name, 'getTime')).length === 1
  }

  private isUsingNewDateOnce() {
    return findAll(this.mainMethod!, (node) => isNewExpression(node) && isIdentifier(node.callee, 'Date')).length === 1
  }

  private findExtractedNumberConstant(): VariableDeclarator | undefined {
    // Remove the main method (which could be a top-level constant)
    const found = findTopLevelConstants(this.program)
      .flatMap((constant) => constant.declarations)
      .filter(declaration => declaration.init !== this.mainMethod)

    if (found.length === 0) {
      return undefined
    }

    const numberComprehension = this.findNumberComprehension()
    return found.find(f => f.init === numberComprehension)
  }

  private isUsingLargeNumberLiteral() {
    return findRawLiteral(this.mainMethod!, '1000000000000') === undefined
      && findRawLiteral(this.mainMethod!, '1000000000') === undefined
  }

  private isUsingIntermediateVariable() {
    return findFirstOfType(this.mainMethod!, AST_NODE_TYPES.VariableDeclaration)
  }

  private findNumberComprehension(): Node | undefined {
    if (this.memoized['number-comprehension']) {
      return this.memoized['number-comprehension']
    }
    const self = this
    return this.memoized['number-comprehension'] =
      findFirst(this.mainMethod!, function(node) {
        return self.isNumberComprehension.call(this, self, node)
      })
  }

  private isNumberComprehension(this: Traverser, self: this, node: Node): boolean {
    // Math.pow(10, 12)
    if (isCallExpression(node, 'Math', 'pow')) {
      this.skip()

      if (node.arguments.length === 2) {
        if (isLiteral(node.arguments[0], 10)) {
          return isLiteral(node.arguments[1], 12)
        }
      }

      return false
    }

    // 1e12
    if (isLiteral(node, undefined, '1e12')) {
      return true
    }

    // (a ** b) and (a * b)
    if (isBinaryExpression(node)) {
      // 1e9 * 1e3
      // (10 ** 9) * 1000
      // Math.pow(10, 9) * 1000
      if (isBinaryExpression(node, '*')) {

        // ... * 1000
        // ... * 1e3
        const rightIsLiteral = isLiteral(node.right, 1000)
        if (rightIsLiteral) {
          return self.isSmallerNumberComprehension.call(this, node.left)
        }

        // 1000 * ...
        // 1e3  * ...
        const leftIsLiteral = isLiteral(node.left, 1000)
        if (leftIsLiteral) {
          return self.isSmallerNumberComprehension.call(this, node.right)
        }

        // Don't return here, because of the type guard being too tight, it
        // will think that `node` now must be "never"
        //
        // return false
      }

      if (isBinaryExpression(node, '**')) {
        // 10 ** 12
        return isLiteral(node.left, 10) && isLiteral(node.right, 12)
      }

      return false
    }

    // 1e12
    if (isLiteral(node, undefined, '1e12')) {
      return true
    }

    return false
  }

  private isSmallerNumberComprehension(this: Traverser, node: Node): boolean {
    // 1e9
    // 1000000000
    if (isLiteral(node, 1e9)) {
      return true
    }

    // Math.pow(10, 9)
    if (isCallExpression(node, 'Math', 'pow')) {
      this.skip()

      if (node.arguments.length === 2) {
        if (isLiteral(node.arguments[0], 10)) {
          return isLiteral(node.arguments[1], 9)
        }
      }
    }

    return false
  }
}

