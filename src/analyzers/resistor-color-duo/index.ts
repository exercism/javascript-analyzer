import { TSESTree } from "@typescript-eslint/typescript-estree";
import { factory } from "~src/comments/comment";
import { NO_METHOD, NO_NAMED_EXPORT, NO_PARAMETER, UNEXPECTED_PARAMETER } from "~src/comments/shared";
import { NoExportError } from "~src/errors/NoExportError";
import { NoMethodError } from "~src/errors/NoMethodError";
import { AstParser } from "~src/parsers/AstParser";
import { IsolatedAnalyzerImpl } from "../IsolatedAnalyzerImpl";
import { HelperCallNotFound, HelperNotOptimal, MethodNotFound, MissingExpectedCall, UnexpectedCallFound, ResistorColorDuoSolution } from "./ResistorColorDuoSolution";
import { Input, WritableOutput } from "~src/interface";

const TIP_EXPORT_INLINE = factory<'method.signature'>`
Did you know that you can export functions, classes and constants directly
inline?
\`\`\`javascript
export ${'method.signature'}
\`\`\`
`('javascript.resistor-color-duo.export_inline')

const TIP_DESTRUCTURING_IN_PARAMETER = factory<'parameter'>`
You can destructure an array directly in the parameter \`${'parameter'}\`.
This allows you to give a name to the items inside, limit how many values come
in and replace the more cryptic numeric indexers with the named items.
`('javascript.resistor-color-duo.destructuring_in_parameter')

const SIGNATURE_NOT_OPTIMAL = factory`
📕 If you look at the tests, the function \`decodedValue\` only receives one
parameter. Nothing more and nothing less.

📕 Remove the additional parameters from your function, as their value will
always be \`undefined\` or whatever default you've assigned.
`('javascript.resistor-color-duo.signature_not_optimal')

const USE_ARRAY_COMPREHENSIONS = factory<'current'>`
💬 Replace \`${'current'}\` with a comprehension such as \`map\`.
`('javascript.resistor-color-duo.use_array_comprehensions')

const LIMIT_NUMBER_OF_COLORS = factory`
💬 Limit the number of input colors that are processed. If more than two colors
are passed in, only the first two colors should be used to calculate the total
\`colorCode\` value.

📕 (At least) one test case inputs three colors instead of two. If the student
has not accounted for this, they might need to update their solution. Help them
find the button to update. The tests won't pass without limiting the number of
colors.
`('javascript.resistor-color-duo.limit_number_of_colors')

const PREFER_NUMBER_OVER_PARSE = factory`
💬 Use \`Number(...)\` when the input is expected to be a number. It's more
strict than the \`parseXXX\` family and applies in this exercise.
`('javascript.resistor-color-duo.prefer_number_over_parse')

const USE_MATH_INSTEAD_OF_TYPE_JUGGLING = factory`
📕 The final value is currently "constructed" by placing digits in a string and
then intepreting that string as a number. This form of type-juggling is not
needed. Instead, a solution using one multiplication and one addition, has
lower cognitive complexity.
`('javascript.resistor-color-duo.use_math_instead_of_type_juggling')

const ISSUE_OPTIMISE_HELPER = factory<'method.name'>`
⚡ The helper method \`${'method.name'}\` is not optimal. The helper can
probably be the same as the solution to \`resistor-color\`. Mentor the student
to retrieve their solution and/or optimise their helper.
`('javascript.resistor-color-duo.must_optimise_helper')

const ISSUE_USE_A_HELPER = factory`
📕 Mentor the student to add helper function and DRY-up this solution. The
solution to \`resistor-color\` can be used as helper method here. When using an
\`Array\` as colors source, in a years time, will the student recall why it's
the _index_ in that array? When using an \`Object\`, what does the value mean?
Re-using \`colorCode\` explains this in both cases.

💬 Using a helper method is good practice, because it replaces a cryptic "member
call" with a named call, that can be documented individually.
`('javascript.resistor-color-duo.must_use_a_helper')

const ISSUE_METHOD_NOT_FOUND = factory<'method.name'>`
⚡ Ensure the method \`${'method/name'}\` exists. It was not found when
analysing this solution. If it does not exist, point this out to the student.

`('javascript.resistor-color-duo.must_declare_function')

const ISSUE_EXPECTED_CALL = factory<'method.name' | 'expected.reason'>`
📕 In order to ${'expected.reason'}, expected a \`${'method.name'}\` call. If
that reasoning applies, mentor the student to add this call.
`('javascript.resistor-color-duo.must_add_missing_call')

const ISSUE_UNEXPECTED_CALL = factory<'unexpected' | 'expected'>`
📕 Found \`${'unexpected'}\`, expected \`${'expected'}\`.
`('javascript.resistor-color-duo.expected_different_call')

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
    // export function decodedValue([tens, ones]) {
    //   return colorCode(ones) + colorCode(tens) * 10
    // }
    //

    if (!solution.isOptimal()) {
      // continue analyzing
      this.logger.log('~> solution is not optimal')
      this.processLastIssue(solution, output)
      return
    }

    this.checkForTips(solution, output)
    output.approve()
  }

  private processLastIssue(solution: ResistorColorDuoSolution, output: WritableOutput): void | never {
    const lastIssue = solution.entry.lastIssue
    if (!lastIssue) {
      this.logger.log('~> no entry issue found')
      return
    }

    if (lastIssue instanceof HelperNotOptimal) {
      // output.add(BETA_COMMENTARY_PREFIX())
      output.disapprove(ISSUE_OPTIMISE_HELPER({ 'method.name': lastIssue.helperName }))
    } else if (lastIssue instanceof HelperCallNotFound) {
      // output.add(BETA_COMMENTARY_PREFIX())
      output.disapprove(ISSUE_USE_A_HELPER())
    } else if (lastIssue instanceof MethodNotFound) {
      // output.add(BETA_COMMENTARY_PREFIX())
      output.disapprove(ISSUE_METHOD_NOT_FOUND({ 'method.name': lastIssue.methodName }))
    } else if (lastIssue instanceof UnexpectedCallFound) {
      output.add(ISSUE_UNEXPECTED_CALL({ 'unexpected': lastIssue.unexpected, 'expected': lastIssue.expected }))

    } else if (lastIssue instanceof MissingExpectedCall) {
      // output.add(BETA_COMMENTARY_PREFIX())
      output.add(ISSUE_EXPECTED_CALL({ 'method.name': lastIssue.methodName, 'expected.reason': lastIssue.reason }))

      // Add extra information for limit number
      if (solution.entry.hasOneMap || solution.entry.hasOneReduce) {
        if (!solution.entry.hasOneSlice) {
          output.add(LIMIT_NUMBER_OF_COLORS())
        }
      }

      output.disapprove()
    } else {
      this.logger.error('The analyzer did not handle the issue: ' + JSON.stringify(lastIssue))
      output.redirect()
    }
  }

  private checkForApprovableSolutions(solution: ResistorColorDuoSolution, output: WritableOutput): void | never {
    if (solution || output) {
      return
    }
  }

  private checkForDisapprovables(solution: ResistorColorDuoSolution, output: WritableOutput): void | never {
    const numberOfComments = output.comments.length

    // Reduce is currently not supported
    if (solution.entry.hasOneReduce) {
      this.logger.error('=> reduce is not handled right now, bailing out.')
      output.redirect()
      return
    }

    if (solution.entry.hasForEach) {
      output.add(USE_ARRAY_COMPREHENSIONS({ current: '.forEach(...)' }))
    } else if (solution.entry.hasFor) {
      output.add(USE_ARRAY_COMPREHENSIONS({ current: 'for(...) { }' }))
    }

    if (solution.entry.hasParseInt) {
      output.add(PREFER_NUMBER_OVER_PARSE())
    }

    if (solution.entry.hasOneMap || solution.entry.hasOneReduce) {
      if (!solution.entry.hasOneSlice) {
        output.add(LIMIT_NUMBER_OF_COLORS())
      }
    } else if ((solution.entry.hasOneOptimalConversion || solution.entry.hasParseInt) && solution.entry.hasDigitsString) {
      output.add(USE_MATH_INSTEAD_OF_TYPE_JUGGLING())
    }

    if (numberOfComments < output.commentCount) {
      // output.comments.unshift(BETA_COMMENTARY_PREFIX())
      output.disapprove()
    }

    if (solution || output) {
      return
    }
  }

  private checkForTips(solution: ResistorColorDuoSolution, output: WritableOutput): void | never {
    if (!solution.hasInlineExport) {
      if (!output.hasCommentary) {
        // output.add(BETA_COMMENTARY_PREFIX())
      }

      // export { gigasecond }
      output.add(
        TIP_EXPORT_INLINE({
          'method.signature': solution.entry.signature,
        })
      )
    }

    if (solution.entry.hasSimpleParameter) {
      if (!output.hasCommentary) {
        // output.add(BETA_COMMENTARY_PREFIX())
      }

      if (solution.entry.hasOneMap || solution.entry.hasOneReduce) {
        // TODO: comment to guide them to the math-y way
      } else {
        output.add(
          TIP_DESTRUCTURING_IN_PARAMETER({
            'parameter': solution.entry.parameterName
          })
        )
      }
    }

    // TODO optimize param
    // TODO use helper method
  }
}
