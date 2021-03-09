import {
  AstParser,
  Input,
  NoExportError,
  NoMethodError,
} from '@exercism/static-analysis'
import { TSESTree } from '@typescript-eslint/typescript-estree'
import { ExecutionOptions, WritableOutput } from '~src/interface'
import { CommentType, factory } from '../../../comments/comment'
import {
  EXEMPLAR_SOLUTION,
  FUNCTION_NOT_OPTIMAL,
  NO_METHOD,
  NO_NAMED_EXPORT,
  PREFER_CONST_OVER_LET_AND_VAR,
  REPLACE_MAGIC_WITH_IDENTIFIER,
} from '../../../comments/shared'
import { IsolatedAnalyzerImpl } from '../../IsolatedAnalyzerImpl'
import {
  EXPECTED_MINUTES_IN_OVEN,
  LasagnaSolution,
  PREPARATION_TIME_IN_MINUTES,
  REMAINING_MINUTES_IN_OVEN,
  TOTAL_TIME_IN_MINUTES,
} from './LasagnaSolution'

type Program = TSESTree.Program

const MUST_CALL_PREPARATION_TIME_IN_MINUTES = factory<'target' | 'function'>`
  Change \`${'target'}\' so it calls \`${'function'}\`.

  According to the instructions, \`${'target'}\` can be implemented by taking
  the preparation time in minutes and adding the amount of time spent in the
  oven. The preparation time in minutes is the result of calling
  \`${'function'}\`.

  In JavaScript a function can be executed using \`()\`, with any arguments
  required comma-separated between the opening parenthesis \`(\` and closing
  parenthesis \`)\`.
`(
  'javascript.lasagna.must_call_preparation_time_in_minutes',
  CommentType.Essential
)

export class LasagnaAnalyzer extends IsolatedAnalyzerImpl {
  private solution!: LasagnaSolution

  protected async execute(
    input: Input,
    output: WritableOutput,
    options: ExecutionOptions
  ): Promise<void> {
    const [parsed] = await AstParser.ANALYZER.parse(input)

    this.solution = this.checkStructure(parsed.program, parsed.source, output)
    this.solution.readExemplar(options.inputDir)

    if (this.solution.isExemplar) {
      output.add(EXEMPLAR_SOLUTION())
      output.finish()
    }

    if (!this.solution.hasConstantDeclaredAsConst) {
      output.add(
        PREFER_CONST_OVER_LET_AND_VAR({
          kind: this.solution.constantKind,
          name: EXPECTED_MINUTES_IN_OVEN,
        })
      )
    }

    if (!this.solution.hasOptimalConstant) {
      // throw new Error('not optimal constant')
    }

    if (!this.solution.remainingMinutesInOven.isOptimal) {
      if (this.solution.remainingMinutesInOven.hasReplacableLiteral) {
        output.add(
          REPLACE_MAGIC_WITH_IDENTIFIER({
            literal: '40',
            identifier: EXPECTED_MINUTES_IN_OVEN,
          })
        )
        return output.finish()
      }

      output.add(FUNCTION_NOT_OPTIMAL({ function: REMAINING_MINUTES_IN_OVEN }))
      return output.finish()
    }

    if (!this.solution.hasOptimalPreparationTimeInMinutes) {
      output.add(
        FUNCTION_NOT_OPTIMAL({ function: PREPARATION_TIME_IN_MINUTES })
      )
      return output.finish()
    }

    if (!this.solution.totalTimeInMinutes.isOptimal) {
      if (!this.solution.totalTimeInMinutes.hasCallToPreparationTime) {
        output.add(
          MUST_CALL_PREPARATION_TIME_IN_MINUTES({
            target: TOTAL_TIME_IN_MINUTES,
            function: PREPARATION_TIME_IN_MINUTES,
          })
        )
        return output.finish()
      }

      output.add(FUNCTION_NOT_OPTIMAL({ function: TOTAL_TIME_IN_MINUTES }))
      return output.finish()
    }

    output.finish()
  }

  private checkStructure(
    program: Readonly<Program>,
    source: Readonly<string>,
    output: WritableOutput
  ): LasagnaSolution | never {
    try {
      return new LasagnaSolution(program, source)
    } catch (error) {
      if (error instanceof NoMethodError) {
        output.add(NO_METHOD({ 'method.name': error.method }))
        output.finish()
      }

      if (error instanceof NoExportError) {
        output.add(NO_NAMED_EXPORT({ 'export.name': error.namedExport }))
        output.finish()
      }

      throw error
    }
  }
}
