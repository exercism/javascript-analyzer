import { AST_NODE_TYPES, TSESTree } from "@typescript-eslint/typescript-estree";

import { factory } from "~src/comments/comment";
import { NO_METHOD, NO_NAMED_EXPORT, NO_PARAMETER, BETA_COMMENTARY_PREFIX, UNEXPECTED_PARAMETER } from "~src/comments/shared";
import { NoExportError } from "~src/errors/NoExportError";
import { NoMethodError } from "~src/errors/NoMethodError";
import { AstParser } from "~src/parsers/AstParser";

import { IsolatedAnalyzerImpl } from "../IsolatedAnalyzerImpl";
import { ResistorColorSolution, HelperNotOptimal, HelperCallNotFound, MethodNotFound, MissingExpectedCall } from "./ResistorColorSolution";

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
parameter. Nothing more and nothing less.

📕 Remove the additional parameters from your function, as their value will
always be \`undefined\` or whatever default you've assigned.
`('javascript.resistor-color.signature_not_optimal')

const USE_INDEX_OF = factory<'current'>`
💬 Replace \`${'current'}\` with a different built-in function, a function
which does exactly what is now explicitly programmed in: finding the index
of a given value in an \`Array\`.
`('javascript.resistor-color.use_index_of')

const USE_IMPLICIT_INCLUDES = factory<'current'>`
💬 Remove the explicit existence check \`.includes\`. When the color-code
is received, there is a special value that is returned if the color is not
present. Use that special value instead.
`('javascript.resistor-color.use_implicit_includes')

const DONT_NORMALISE_INPUTS = factory`
💬 Remove the call to \`.toLowerCase\`. The tests only provide the inputs
in lower case, and the colors should be defined in lower case. There is
no need to manually normalise the inputs.
`('javascript.resistor-color.dont_normalise_inputs')

const USE_ARRAY_COMPREHENSIONS = factory<'current'>`
💬 Replace \`${'current'}\` with a single function call that _directly_
finds the index of a given input value.
`('javascript.resistor-color.use_array_comprehensions')

const ISSUE_OPTIMISE_HELPER = factory<'method.name'>`
⚡ The helper method \`${'method.name'}\` is not optimal. The helper can
probably be the same as the solution to \`resistor-color\`. Mentor the student
to retrieve their solution and/or optimise their helper.
`('javascript.resistor-color.must_optimise_helper')

const ISSUE_USE_A_HELPER = factory`
📕 Mentor the student to add helper function and DRY-up this solution. The
solution to \`resistor-color\` can be used as helper method here. When using an
\`Array\` as colors source, in a years time, will the student recall why it's
the _index_ in that array? When using an \`Object\`, what does the value mean?
Re-using \`colorCode\` explains this in both cases.

💬 Using a helper method is good practice, because it replaces a cryptic "member
call" with a named call, that can be documented individually.
`('javascript.resistor-color.must_use_a_helper')

const ISSUE_METHOD_NOT_FOUND = factory<'method.name'>`
⚡ Ensure the method \`${'method/name'}\` exists. It was not found when
analysing this solution. If it does not exist, point this out to the student.

`('javascript.resistor-color.must_declare_function')

const ISSUE_EXPECTED_CALL = factory<'method.name' | 'expected.reason'>`
📕 In order to ${'expected.reason'}, expected a \`${'method.name'}\` call. If
that reasoning applies, mentor the student to add this call.
`('javascript.resistor-color.must_add_missing_call')

type Program = TSESTree.Program

const Parser: AstParser = new AstParser(undefined, 1)

export class ResistorColorAnalyzer extends IsolatedAnalyzerImpl {

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

  private checkStructure(program: Readonly<Program>, source: Readonly<string>, output: WritableOutput): ResistorColorSolution | never {
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

  private checkSignature({ entry }: ResistorColorSolution, output: WritableOutput): void | never {
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

  private checkForOptimalSolutions(solution: ResistorColorSolution, output: WritableOutput): void | never {
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
      this.processLastIssue(solution, output)
      return
    }

    this.checkForTips(solution, output)
    output.approve()
  }

  private processLastIssue(solution: ResistorColorSolution, output: WritableOutput): void | never {
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
    } else if (lastIssue instanceof MissingExpectedCall) {
      // output.add(BETA_COMMENTARY_PREFIX())
      output.add(ISSUE_EXPECTED_CALL({ 'method.name': lastIssue.methodName, 'expected.reason': lastIssue.reason }))

      output.disapprove()
    } else {
      this.logger.error('The analyzer did not handle the issue: ' + JSON.stringify(lastIssue))
      output.redirect()
    }
  }

  private checkForApprovableSolutions(solution: ResistorColorSolution, output: WritableOutput): void | never {
    if (solution || output) {
      return
    }
  }

  private checkForDisapprovables(solution: ResistorColorSolution, output: WritableOutput): void | never {
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

  private checkForTips(solution: ResistorColorSolution, output: WritableOutput): void | never {
    if (!solution.hasInlineExports) {
      if (!output.hasCommentary) {
        // output.add(BETA_COMMENTARY_PREFIX())
      }

      // export { gigasecond }
      output.add(
        TIP_EXPORT_INLINE({
          'method.signature': solution.entry.signature,
          'constant.signature': solution.constant.signature
        })
      )
    }

    // TODO optimize param
    // TODO use helper method
  }
}
