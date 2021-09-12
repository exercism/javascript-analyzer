import {
  AstParser,
  guardIdentifier,
  Input,
  NoExportError,
  NoMethodError,
} from '@exercism/static-analysis'
import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { IsolatedAnalyzerImpl } from '~src/analyzers/IsolatedAnalyzerImpl'
import { CommentType, factory } from '~src/comments/comment'
import {
  NO_METHOD,
  NO_NAMED_EXPORT,
  NO_PARAMETER,
  PREFER_CONST_OVER_LET_AND_VAR,
  UNEXPECTED_PARAMETER,
} from '~src/comments/shared'
import type { WritableOutput } from '~src/interface'
import { GigasecondSolution } from './GigasecondSolution'

const TIP_EXPORT_INLINE = factory<'method.signature'>`
Did you know that you can export functions, classes and constants directly
inline?
\`\`\`javascript
export ${'method.signature'}
\`\`\`
`('javascript.gigasecond.export_inline', CommentType.Informative)

const PREFER_NUMBER_COMPREHENSION = factory<'literal'>`
Large numbers like \`${'literal'}\` are easy to misread and difficult to
comprehend. Rewrite the literal \`${'literal'}\` using \`Math.pow\` or
\`10 ** n\` to make it more readable and lower the cognitive complexity.
`('javascript.gigasecond.prefer_number_comprehension', CommentType.Actionable)

const PREFER_TOP_LEVEL_CONSTANT = factory<'value' | 'name'>`
Your solution current has a magic number, or rather a magic expression. Consider
extracting the gigasecond number into a top-level constant, so that you may
remember what it represents if you ever come back to this code.

\`\`\`javascript
const ${'name'} = ${'value'}

export const gigasecond = (...)
\`\`\`
`('javascript.gigasecond.prefer_top_level_constant', CommentType.Actionable)

const PREFER_EXTRACTED_TOP_LEVEL_CONSTANT = factory<'value' | 'name'>`
Instead of defining the constant _inside_ the function, consider extracting it
to the top-level. Constants, functions and classes that are not \`export\`ed,
are not accessible from outside the file.

\`\`\`javascript
const ${'name'} = ${'value'}

export const gigasecond = (...)
\`\`\`
`(
  'javascript.gigasecond.prefer_extracted_top_level_constant',
  CommentType.Actionable
)

const SIGNATURE_NOT_OPTIMAL = factory`
If you look at the tests, the function \`gigasecond\` only receives one
parameter. Nothing more and nothing less.

Remove the additional parameters from your function, as their value will always
be \`undefined\` or whatever default you've assigned.
`('javascript.gigasecond.signature_not_optimal', CommentType.Actionable)

const DONT_USE_DATE_PARSE = factory<'parameter.name'>`
Use [\`Date#getTime\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime),
as \`Date.parse(${'parameter.name'})\` is not a good candidate. It's supposed to
work with strings only, and not _intended_ to be used like this.
`('javascript.gigasecond.dont_use_date_parse', CommentType.Essential)

const DONT_USE_DATE_VALUE = factory`
Use [\`Date#getTime\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)
instead of [\`Date#valueOf\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/valueOf).
They are functionally equivalent, but \`valueOf\` is marked as follows:

> This method is usually called internally by JavaScript and not explicitly in
> code.
`('javascript.gigasecond.dont_use_date_value', CommentType.Essential)

const PREFER_SIDE_EFFECT_FREE_DATE = factory`
Use [\`Date#getTime\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)
and [\`new Date(value)\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Syntax),
which takes a number of milliseconds as \`value\` and constructs a _new_ date.

This ensures the _input_ is not modified when calling \`gigasecond\`, which
also means that there are no unintended side-effects. Futhermore, \`setSeconds\`
only works because it _rolls over_, but it wasn't meant to be used like this.
Its function is to set the \`seconds\` component of a \`Date\`.
`('javascript.gigasecond.prefer_side_effect_free_date', CommentType.Actionable)

const DONT_USE_GET_SECONDS = factory`
Use [\`Date#getTime\`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTime)
to get the number of milliseconds the \`Date\` represents, instead of getting
the \`seconds\` component of the \`Date\`. In general, [Unix/UTC time](https://en.wikipedia.org/wiki/Unix_time)
is preferred when dealing with dates, as it is not affected by _interpretation_
or locale (such as timezones).
`('javascript.gigasecond.dont_use_get_seconds', CommentType.Essential)

type Program = TSESTree.Program
export class GigasecondAnalyzer extends IsolatedAnalyzerImpl {
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
  ): GigasecondSolution | never {
    try {
      return new GigasecondSolution(program, source)
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
    { entry }: GigasecondSolution,
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
    solution: GigasecondSolution,
    output: WritableOutput
  ): void | never {
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

  private checkForApprovableSolutions(
    solution: GigasecondSolution,
    output: WritableOutput
  ): void | never {
    if (solution.constant) {
      this.logger.log(`=> found a constant (${solution.constant.kind})`)

      if (solution.constant.kind !== 'const') {
        output.add(
          PREFER_CONST_OVER_LET_AND_VAR({
            kind: solution.constant.kind,
            name: solution.constant.name,
          })
        )

        // If this is the only issue, approve
        if (
          solution.entry.isOptimal(
            solution.constant,
            solution.numberComprehension
          )
        ) {
          output.approve()
        }
      }

      if (solution.constant.isLargeNumberLiteral) {
        output.disapprove(
          PREFER_NUMBER_COMPREHENSION({
            literal: solution.constant.name,
          })
        )
      }
    } else {
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
      const literal = solution.numberLiteral

      if (comprehension) {
        this.logger.log(`=> found a comprehension (${comprehension.type})`)
        switch (comprehension.type) {
          // ... + 10 ** 12
          case AST_NODE_TYPES.BinaryExpression: {
            output.add(
              PREFER_TOP_LEVEL_CONSTANT({
                name: 'GIGASECOND_IN_MS',
                value: solution.source.get(comprehension),
              })
            )
            break
          }

          // Math.pow(10, 12)
          case AST_NODE_TYPES.CallExpression: {
            output.add(
              PREFER_TOP_LEVEL_CONSTANT({
                name: 'GIGASECOND_IN_MS',
                value: solution.source.get(comprehension),
              })
            )
            break
          }

          // 1e12
          case AST_NODE_TYPES.Literal: {
            output.add(
              PREFER_TOP_LEVEL_CONSTANT({
                name: 'GIGASECOND_IN_MS',
                value: solution.source.get(comprehension),
              })
            )
            break
          }

          // const name = ... (one of the comprehensions above)
          case AST_NODE_TYPES.VariableDeclarator: {
            // Extract into const to top-level
            output.add(
              PREFER_EXTRACTED_TOP_LEVEL_CONSTANT({
                name:
                  ('id' in comprehension &&
                    guardIdentifier(comprehension.id) &&
                    comprehension.id.name) ||
                  'GIGASECOND_IN_MS',
                value:
                  (comprehension.init &&
                    solution.source.get(comprehension.init)) ||
                  '...',
              })
            )
            break
          }
        }

        if (solution.entry.isOptimal(undefined, comprehension)) {
          this.checkForTips(solution, output)

          // Everything else is optimal, so approve!
          output.approve()
        }

        return
      } else if (literal) {
        this.logger.log(`=> found a literal (${literal.type})`)
        output.disapprove(
          PREFER_NUMBER_COMPREHENSION({
            literal:
              ('raw' in literal && literal.raw) || solution.source.get(literal),
          })
        )
      }

      return
    }
  }

  private checkForDisapprovables(
    solution: GigasecondSolution,
    output: WritableOutput
  ): void | never {
    const numberOfComments = output.comments.length

    if (solution.entry.hasDateParse) {
      output.add(
        DONT_USE_DATE_PARSE({
          'parameter.name': solution.entry.parameterName,
        })
      )
    }

    if (solution.entry.hasDateValueOnInput) {
      output.add(DONT_USE_DATE_VALUE())
    }

    if (solution.entry.hasSetSecondsOnInput) {
      output.add(PREFER_SIDE_EFFECT_FREE_DATE())
    } else if (solution.entry.hasGetSecondsOnInput) {
      output.add(DONT_USE_GET_SECONDS())
    }

    if (numberOfComments < output.commentCount) {
      output.disapprove()
    }
  }

  private checkForTips(
    solution: GigasecondSolution,
    output: WritableOutput
  ): void | never {
    if (!solution.hasInlineExport) {
      // export { gigasecond }
      output.add(
        TIP_EXPORT_INLINE({
          'method.signature': solution.entry.signature,
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
            name: constant.name,
          })
        )
      }
    }
  }
}
