import {
  AstParser,
  Input,
  NoExportError,
  NoMethodError,
} from '@exercism/static-analysis'
import { TSESTree } from '@typescript-eslint/typescript-estree'
import { CommentType, factory } from '~src/comments/comment'
import { ExecutionOptions, WritableOutput } from '~src/interface'
import { NO_METHOD, NO_NAMED_EXPORT } from '../../../comments/shared'
import { IsolatedAnalyzerImpl } from '../../IsolatedAnalyzerImpl'
import { LasagnaSolution } from './LasagnaSolution'

const EXEMPLAR_SOLUTION_SUMMARY = `
🎉 That is an exemplar solution. Congratulations. It is exactly what we think
is the most idiomatic implementation of the tasks at hand.
`.trim()

const SIGNATURE_CHANGED = factory`
📕 Don't change the function declarations unless absolutely necessary. The stub
provides the correct exports and correct function declarations, with the
expected amount and format of parameters. It is sometimes possible to change the
function signature (change how its parameters work), but in this case the
parameters were already optimally defined.
`('javascript.lasagna.signature_changed')

const REMAINING_MINUTES_IN_OVEN_NOT_OPTIMAL = factory`
📕 It looks like remainingMinutesInOven is not optimal, but the automated
analyzer isn't smart enough yet to figure out what exactly is not optimal. In
general, this function is expected to be as simple as possible, without
declaring any extra variables.`(
  'javascript.lasagna.remaining_minutes_in_oven_not_optimal',
  CommentType.Informative
)

const PREPARATION_TIME_IN_MINUTES_NOT_OPTIMAL = factory`
📕 It looks like preparationTimeInMinutes is not optimal, but the automated
analyzer isn't smart enough yet to figure out what exactly is not optimal. In
general, this function is expected to be as simple as possible, without
declaring any extra variables.`(
  'javascript.lasagna.preparation_time_in_minutes_not_optimal',
  CommentType.Informative
)

const TOTAL_TIME_IN_MINUTES_NOT_OPTIMAL = factory`
📕 It looks like totalTimeInMinutes is not optimalbut the automated analyzer
isn't smart enough yet to figure out what exactly is not optimal. In general,
this function is expected to be as simple as possible, without declaring any
extra variables.`(
  'javascript.lasagna.total_time_in_minutes_not_optimal',
  CommentType.Informative
)

type Program = TSESTree.Program

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
      return output.finish(EXEMPLAR_SOLUTION_SUMMARY)
    }

    if (!this.solution.hasConstantDeclaredAsConst) {
      // PREFER_CONST_OVER_LET_AND_VAR()
    }

    if (!this.solution.hasOptimalConstant) {
      // throw new Error('not optimal constant')
    }

    if (!this.solution.hasOptimalRemainingMinutesInOven) {
      output.summary = REMAINING_MINUTES_IN_OVEN_NOT_OPTIMAL().toString()
      // output.add(REMAINING_MINUTES_IN_OVEN_NOT_OPTIMAL())
      return output.finish()
    }

    if (!this.solution.hasOptimalPreparationTimeInMinutes) {
      output.summary = PREPARATION_TIME_IN_MINUTES_NOT_OPTIMAL().toString()
      // output.add(PREPARATION_TIME_IN_MINUTES_NOT_OPTIMAL())
      return output.finish()
    }

    if (!this.solution.hasOptimalTotalTimeInMinutes) {
      output.summary = TOTAL_TIME_IN_MINUTES_NOT_OPTIMAL().toString()
      // output.add(TOTAL_TIME_IN_MINUTES_NOT_OPTIMAL())
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
