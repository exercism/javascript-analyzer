import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";

import { isIdentifier } from "~src/analyzers/utils/is_identifier";
import { factory } from "~src/comments/comment";
import { NO_METHOD, NO_NAMED_EXPORT, NO_PARAMETER, PREFER_CONST_OVER_LET_AND_VAR, UNEXPECTED_PARAMETER } from "~src/comments/shared";
import { NoExportError } from "~src/errors/NoExportError";
import { NoMethodError } from "~src/errors/NoMethodError";
import { AstParser } from "~src/parsers/AstParser";

import { IsolatedAnalyzerImpl } from "../IsolatedAnalyzerImpl";
import { ResistorColorDuoSolution } from "./ResistorColorDuoSolution";

const TIP_EXPORT_INLINE = factory<'method.signature'>`
Did you know that you can export functions, classes and constants directly
inline?
\`\`\`javascript
export ${'method.signature'}
\`\`\`
`('javascript.resistor-color-duo.export_inline')

const SIGNATURE_NOT_OPTIMAL = factory`
If you look at the tests, the function \`value\` only receives one
parameter. Nothing more and nothing less.

Remove the additional parameters from your function, as their value will always
be \`undefined\` or whatever default you've assigned.
`('javascript.resistor-color-duo.signature_not_optimal')

type Program = TSESTree.Program

const Parser: AstParser = new AstParser(undefined, 1)

export class ResistorColorDuoAnalyzer extends IsolatedAnalyzerImpl {

  protected async execute(input: Input, output: WritableOutput): Promise<void> {
    const [parsed] = await Parser.parse(input)

    // Firstly we want to check that the structure of this solution is correct
    // and that there is nothing structural stopping it from passing the tests
    const solution = this.checkStructure(parsed.program, parsed.source, output)

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
    this.checkForDisapprovables(solution, output)

    // The solution is automatically referred to the mentor if it reaches this
  }

  private checkStructure(program: Readonly<Program>, source: Readonly<string>, output: WritableOutput): ResistorColorDuoSolution | never {
    try {
      return new ResistorColorDuoSolution(program, source)
    } catch (error) {
      if (error instanceof NoMethodError) {
        output.disapprove(NO_METHOD({ 'method.name': error.method }))
      }

      if (error instanceof NoExportError) {
        output.disapprove(NO_NAMED_EXPORT({ 'export.name': error.namedExport }))
      }

      throw error
    }
  }

  private checkSignature({ entry }: ResistorColorDuoSolution, output: WritableOutput): void | never {
    // If there is no parameter then this solution won't pass the tests.
    //
    if (!entry.hasAtLeastOneParameter) {
      output.disapprove(NO_PARAMETER({ 'function.name': entry.name }))
    }

    // If this is not a simple parameter, but something else such as a splat,
    // or a parameter with a default argument, bail out and refer to mentor.
    //
    if (!entry.hasSimpleParameter && !entry.hasOptimalParameter) {
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

  private checkForOptimalSolutions(solution: ResistorColorDuoSolution, output: WritableOutput): void | never {
    // The optional solution looks like this:
    //
    // const COLORS = [...]
    //
    // function colorCode(...) { ... }
    //
    // export function value([tens, ones]) {
    //   return colorCode(ones) + colorCode(tens) * 10
    // }
    //

    if (!solution.isOptimal()) {
      // continue analyzing
      this.logger.log('~> solution is not optimal')
      return
    }

    this.checkForTips(solution, output)
    output.approve()
  }

  private checkForApprovableSolutions(solution: ResistorColorDuoSolution, output: WritableOutput): void | never {
    if (solution || output) {
      return
    }
  }

  private checkForDisapprovables(solution: ResistorColorDuoSolution, output: WritableOutput): void | never {
    const numberOfComments = output.comments.length

    if (numberOfComments < output.commentCount) {
      output.disapprove()
    }

    if (solution || output) {
      return
    }
  }

  private checkForTips(solution: ResistorColorDuoSolution, output: WritableOutput): void | never {
    if (!solution.hasInlineExport) {
      // export { gigasecond }
      output.add(
        TIP_EXPORT_INLINE({
          'method.signature': solution.entry.signature,
        })
      )
    }
  }
}
