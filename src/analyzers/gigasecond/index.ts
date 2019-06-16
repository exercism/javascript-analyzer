import { TSESTree, AST_NODE_TYPES } from "@typescript-eslint/typescript-estree";

import { factory } from "~src/comments/comment";
import { NO_METHOD, NO_NAMED_EXPORT, NO_PARAMETER, PREFER_CONST_OVER_LET_AND_VAR, UNEXPECTED_PARAMETER } from "~src/comments/shared";
import { NoExportError } from "~src/errors/NoExportError";
import { NoMethodError } from "~src/errors/NoMethodError";
import { AstParser } from "~src/parsers/AstParser";

import { IsolatedAnalyzerImpl } from "../IsolatedAnalyzerImpl";
import { GigasecondSolution } from "./GigasecondSolution";

const TIP_EXPORT_INLINE = factory<'method_signature'>`
Did you know that you can export functions, classes and constants directly
inline?
\`\`\`javascript
export ${'method_signature'}
\`\`\`
`('javascript.gigasecond.export_inline')

const USE_NUMBER_COMPREHENSION = factory<'literal'>`
Large numbers like \`${'literal'}\` are easy to misread and difficult to
comprehend. Rewrite the literal \`${'literal'}\` using \`Math.pow\` or
\`10 ** n\` to make it more readable and lower the cognitive complexity.
`('javascript.gigasecond.use_number_comprehension')

const PREFER_TOP_LEVEL_CONSTANT = factory<'value' | 'name'>`
Consider extracting the gigasecond number into a constant:

\`\`\`javascript
const ${'name'} = ${'value'}

export const gigasecond = (...)
\`\`\`
`('javascript.gigasecond.prefer_top_level_constant')

const SIGNATURE_NOT_OPTIMAL = factory`
If you look at the tests, the function \`gigasecond\` only receives one
paremeter. Nothing more and nothing less.

Remove the additional parameters from your function, as their value will always
be \`undefined\` or whatever default you've assigned.
`('javascript.gigasecond.signature_not_optimal')

type Program = TSESTree.Program

const Parser: AstParser = new AstParser(undefined, 1)

export class GigasecondAnalyzer extends IsolatedAnalyzerImpl {

  protected async execute(input: Input, output: WritableOutput): Promise<void> {
    const [parsed] = await Parser.parse(input)

    // Firstly we want to check that the structure of this solution is correct
    // and that there is nothing structural stopping it from passing the tests
    const solution = this.checkStructure(parsed.program, output)

    // Now we want to ensure that the method signature is sane and that it has
    // valid arguments.
    this.checkSignature(solution, output)

    // There are a handful optimal solutions for gigasecond which needs no
    // comments and can just be approved. If we have it, then let's just
    // acknowledge it and get out of here.
    this.checkForOptimalSolutions(solution, output)

    // The solution might not be optimal but still be approvable. Check these
    // first and bail-out (with approval) if that's the case.
    this.checkForApprovableSolutions(solution, output)

    // Time to find sub-optimal code.

    // The solution is automatically referred to the mentor if it reaches this
  }

  private checkStructure(program: Readonly<Program>, output: WritableOutput) {
    try {
      return new GigasecondSolution(program)
    } catch (error) {
      if (error instanceof NoMethodError) {
        output.disapprove(NO_METHOD({ method_name: error.method }))
      }

      if (error instanceof NoExportError) {
        output.disapprove(NO_NAMED_EXPORT({ export_name: error.namedExport }))
      }

      throw error
    }
  }

  private checkSignature({ entry }: GigasecondSolution, output: WritableOutput) {
    // If there is no parameter then this solution won't pass the tests.
    //
    if (!entry.hasAtLeastOneParameter) {
      output.disapprove(NO_PARAMETER({ function_name: entry.name }))
    }

    // If this is not a simple parameter, but something else such as a splat,
    // or a parameter with a default argument, bail out and refer to mentor.
    //
    if (!entry.hasSimpleParameter) {
      output.redirect(UNEXPECTED_PARAMETER({ type: entry.parameterType }))
    }

    // If there is more than one parameter, something fishy is going on. Collect
    // the comment for the student, to disapprove later on.
    //
    if (!entry.hasExactlyOneParameter) {
      output.add(SIGNATURE_NOT_OPTIMAL())
    }

    // TODO: do we want to check more here?

    //
    //
    if (output.hasCommentary) {
      output.disapprove()
    }
  }

  private checkForOptimalSolutions(solution: GigasecondSolution, output: WritableOutput) {
    // The optional solution looks like this:
    //
    // const GIGASECOND_IN_MS = 10 ** 12
    //
    // export function gigasecond(input) {
    //   return new Date(input.getTime() + GIGASECOND_IN_MS)
    // }
    //
    // It does not modify the input, it does not use `setXXX`, it extracts the
    // large number into a const and it uses Math.pow or ** to write the large
    // number.
    //

    if (!solution.isOptimal()) {
      // continue analyzing
      this.logger.log('~> solution is not optimal')
      return
    }

    this.checkForTips(solution, output)
    output.approve()
  }

  private checkForApprovableSolutions(solution: GigasecondSolution, output: WritableOutput) {
    if (!solution.constant) {
      // This means there is no constant found. The approvable solution looks
      // like this
      //
      // export function gigasecond(input) {
      //   return new Date(input.getTime() + 10 ** 12)
      // }
      //
      // Or this
      //
      // export function gigasecond(input) {
      //   const GIGASECOND_IN_MS = 10 ** 12
      //   return new Date(input.getTime() + GIGASECOND_IN_MS)
      // }

      const comprehension = solution.numberComprehension

      if (comprehension) {
        console.log(`=> found a comprehension (${comprehension.type})`)
        switch (comprehension.type) {
          // Top case
          case AST_NODE_TYPES.BinaryExpression: {
            // TODO: extract into const
          }
          default: {
            // TODO: extract into const to top-level
          }
        }

        // TODO: check if the _rest_ is optimal. If yes approve, otherwise
        // comment don't approve and have the rest of this analyzer disapprove
      } else {
        // TODO: check if there is 1000000000000
      }

      this.logger.log(JSON.stringify(comprehension, null, 2))

      return
    }
  }

  private checkForTips(solution: GigasecondSolution, output: WritableOutput) {
    if (!solution.hasInlineExport) {
      // export { gigasecond }
      output.add(
        TIP_EXPORT_INLINE({
          method_signature: 'function gigasecond(...) { ... }',
        })
      )
    }

    // For the optimal solution, this may be anything
    //
    if (solution.hasOneConstant && !solution.areFileConstantsConst) {
      const { constant } = solution

      if (constant) {
        // let GIGASECOND_IN_MS =
        // var GIGASECOND_IN_MS =
        output.add(
          PREFER_CONST_OVER_LET_AND_VAR({
            kind: constant.kind,
            name: constant.name
          })
        )
      }
    }
  }
}

/*
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
*/
