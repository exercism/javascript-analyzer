import {
  AstParser,
  Input,
  NoExportError,
  NoMethodError,
} from '@exercism/static-analysis'
import type { TSESTree } from '@typescript-eslint/typescript-estree'
import {
  EXEMPLAR_SOLUTION,
  NO_METHOD,
  NO_NAMED_EXPORT,
} from '../../../comments/shared'
import { ExecutionOptions, WritableOutput } from '../../../interface'
import { IsolatedAnalyzerImpl } from '../../IsolatedAnalyzerImpl'
import { FreelancerRatesSolution } from './FreelancerRatesSolution'

type Program = TSESTree.Program

export class FreelancerRatesAnalyzer extends IsolatedAnalyzerImpl {
  private solution!: FreelancerRatesSolution

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
  ): FreelancerRatesSolution | never {
    try {
      return new FreelancerRatesSolution(program, source)
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
