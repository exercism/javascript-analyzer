import {
  AstParser,
  Input,
  NoExportError,
  NoMethodError,
} from '@exercism/static-analysis'
import { TSESTree } from '@typescript-eslint/typescript-estree'
import {
  EXEMPLAR_SOLUTION,
  NO_METHOD,
  NO_NAMED_EXPORT,
} from '../../../comments/shared'
import { WritableOutput, ExecutionOptions } from '../../../interface'
import { IsolatedAnalyzerImpl } from '../../IsolatedAnalyzerImpl'
import { ElysesAnalyticEnchantmentsSolution } from './ElysesAnalyticEnchantmentsSolution'
type Program = TSESTree.Program
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
