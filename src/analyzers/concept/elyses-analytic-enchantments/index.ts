import {
  AstParser,
  Input,
  NoExportError,
  NoMethodError,
} from '@exercism/static-analysis'
import { TSESTree } from '@typescript-eslint/typescript-estree'
import { CommentType, factory } from '../../../comments/comment'
import {
  EXEMPLAR_SOLUTION,
  FUNCTION_NOT_OPTIMAL,
  NO_METHOD,
  NO_NAMED_EXPORT,
  PREFER_BUILT_IN_METHOD,
} from '../../../comments/shared'
import { WritableOutput, ExecutionOptions } from '../../../interface'
import { IsolatedAnalyzerImpl } from '../../IsolatedAnalyzerImpl'
import {
  ElysesAnalyticEnchantmentsSolution,
  GET_CARD_POSITION,
} from './ElysesAnalyticEnchantmentsSolution'

type Program = TSESTree.Program

export const MUST_AVOID_IMPERATIVE_LOOP = factory`
  Avoid use of for loops with this practice exercise. MAKE THIS MORE INFOMATIVE.
`(
  'javascript.elyses-analytic-enchantments.must_avoid_imperative_loop',
  CommentType.Essential
)

export class ElysesAnalyticEnchantmentsAnalyzer extends IsolatedAnalyzerImpl {
  private solution!: ElysesAnalyticEnchantmentsSolution

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

    if (this.solution.hasforEach || this.solution.hasFor) {
      output.add(MUST_AVOID_IMPERATIVE_LOOP())
      output.disapprove()
    }

    if (!this.solution.cardPosition.isOptimal) {
      if (!this.solution.cardPosition.usesIndexOf) {
        output.add(
          PREFER_BUILT_IN_METHOD({
            type: 'Array',
            method: 'indexOf',
          })
        )
        output.finish()
      } else {
        output.add(FUNCTION_NOT_OPTIMAL({ function: GET_CARD_POSITION }))
      }
      output.finish()
    }

    output.finish()
  }

  private checkStructure(
    program: Readonly<Program>,
    source: Readonly<string>,
    output: WritableOutput
  ): ElysesAnalyticEnchantmentsSolution | never {
    try {
      return new ElysesAnalyticEnchantmentsSolution(program, source)
    } catch (error) {
      if (error instanceof NoMethodError) {
        output.add(NO_METHOD({ 'method.name': error.method }))
        output.finish()
      }

      if (error instanceof NoExportError) {
        output.add(NO_NAMED_EXPORT({ 'export.name': error.namedExport }))
      }

      throw error
    }
  }
}
export default ElysesAnalyticEnchantmentsAnalyzer
