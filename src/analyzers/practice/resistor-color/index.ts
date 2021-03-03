import {
  AstParser,
  Input,
  NoExportError,
  NoMethodError,
} from '@exercism/static-analysis'
import { TSESTree } from '@typescript-eslint/typescript-estree'
import { IsolatedAnalyzerImpl } from '~src/analyzers/IsolatedAnalyzerImpl'
import { factory } from '~src/comments/comment'
import {
  NO_METHOD,
  NO_NAMED_EXPORT,
  NO_PARAMETER,
  UNEXPECTED_PARAMETER,
} from '~src/comments/shared'
import { WritableOutput } from '~src/interface'
import { ResistorColorSolution } from './ResistorColorSolution'

const TIP_EXPORT_INLINE = factory<'method.signature' | 'constant.signature'>`
Did you know that you can export functions, classes and constants directly
inline?
\`\`\`javascript
export ${'constant.signature'}

export ${'method.signature'}
\`\`\`
`('javascript.resistor-color.export_inline')

const SIGNATURE_NOT_OPTIMAL = factory`
📕 If you look at the tests, the function \`colorCode\` only receives one
parameter. Nothing more and nothing less. Suggest that the student
removes the additional parameters from your function, as their value will
always be \`undefined\` or whatever default they've assigned.
`('javascript.resistor-color.signature_not_optimal')

const USE_INDEX_OF = factory<'current'>`
📕 The analyzer expected \`indexOf\`, instead of  \`${'current'}\`.

💬 Replace \`${'current'}\` with a different built-in function, a function
which does exactly what is now explicitly programmed in: finding the index
of a given value in an \`Array\`.
`('javascript.resistor-color.use_index_of')

const USE_ARRAY_COMPREHENSIONS = factory<'current'>`
📕 The analyzer expected \`indexOf\`, instead of  \`${'current'}\`.

💬 Replace \`${'current'}\` with a single function call that _directly_
finds the index of a given input value.
`('javascript.resistor-color.use_array_comprehensions')

const USE_IMPLICIT_INCLUDES = factory<'current'>`
📕 Using \`includes\` iterates _twice_ over the array. Performance is not
an issue in this exercise, but the logic is unnecessary. **Please note**:
throwing an \`Error\`, when a color does not exist, is perfectly fine and
should not be discouraged.

💬 Remove the explicit existence check \`.includes\`. When the color
string is converted to a color code (number), there is already a special
value which is returned if the color is not present. Look for and use
that value instead.
`('javascript.resistor-color.use_implicit_includes')

const DONT_NORMALISE_INPUTS = factory`
📕 It's always fine to be defensive about inputs, so that a program will
run correctly under more circumstances. However, arbitary input
normalisation is discouraged on Exercism. Later exercises will have
defined inputs that are denormalised where we'll expect sanitizing and
normalising the input. Keep it simple for now.

💬 Remove the call to \`.toLowerCase\`. The tests only provide the inputs
in lower case, and the colors should be defined in lower case. There is
no need to manually normalise the inputs.
`('javascript.resistor-color.dont_normalise_inputs')

type Program = TSESTree.Program

export class ResistorColorAnalyzer extends IsolatedAnalyzerImpl {
  protected async execute(input: Input, output: WritableOutput): Promise<void> {
    const [parsed] = await AstParser.ANALYZER.parse(input)

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

  private checkStructure(
    program: Readonly<Program>,
    source: Readonly<string>,
    output: WritableOutput
  ): ResistorColorSolution | never {
    try {
      return new ResistorColorSolution(program, source)
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

  private checkSignature(
    { entry }: ResistorColorSolution,
    output: WritableOutput
  ): void | never {
    // If there is no parameter then this solution won't pass the tests.
    //
    if (!entry.hasAtLeastOneParameter) {
      output.disapprove(NO_PARAMETER({ 'function.name': entry.name }))
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

  private checkForOptimalSolutions(
    solution: ResistorColorSolution,
    output: WritableOutput
  ): void | never {
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

  private checkForApprovableSolutions(
    solution: ResistorColorSolution,
    output: WritableOutput
  ): void | never {
    if (solution || output) {
      return
    }
  }

  private checkForDisapprovables(
    solution: ResistorColorSolution,
    output: WritableOutput
  ): void | never {
    const numberOfComments = output.comments.length

    if (solution.entry.hasFindIndex) {
      output.add(USE_INDEX_OF({ current: '.findIndex(...)' }))
    } else if (solution.entry.hasForEach) {
      output.add(USE_ARRAY_COMPREHENSIONS({ current: '.forEach(...)' }))
    } else if (solution.entry.hasFor) {
      output.add(USE_ARRAY_COMPREHENSIONS({ current: 'for(...) { }' }))
    }

    if (solution.entry.hasIncludes) {
      output.add(USE_IMPLICIT_INCLUDES())
    }

    if (solution.entry.hasToLowerCase) {
      output.add(DONT_NORMALISE_INPUTS())
    }

    if (numberOfComments < output.commentCount) {
      // output.comments.unshift(BETA_COMMENTARY_PREFIX())
      output.disapprove()
    }

    if (solution || output) {
      return
    }
  }

  private checkForTips(
    solution: ResistorColorSolution,
    output: WritableOutput
  ): void | never {
    if (!solution.hasInlineExports) {
      if (!output.hasCommentary) {
        // output.add(BETA_COMMENTARY_PREFIX())
      }

      // export { gigasecond }
      output.add(
        TIP_EXPORT_INLINE({
          'method.signature': solution.entry.signature,
          'constant.signature': solution.constant.signature,
        })
      )
    }

    // TODO optimize param
    // TODO use helper method
  }
}
