import type { Input } from '@exercism/static-analysis'
import {
  AstParser,
  NoExportError,
  NoMethodError,
} from '@exercism/static-analysis'
import type { TSESTree } from '@typescript-eslint/typescript-estree'
import type { ExecutionOptions, WritableOutput } from '~src/interface'
import {
  EXEMPLAR_SOLUTION,
  NO_METHOD,
  NO_NAMED_EXPORT,
} from '../../../comments/shared'
import { IsolatedAnalyzerImpl } from '../../IsolatedAnalyzerImpl'
import { ExemplarSolution } from './ExemplarSolution'

type Program = TSESTree.Program

export class ExemplarAnalyzer extends IsolatedAnalyzerImpl {
  private solution!: ExemplarSolution

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
  ): ExemplarSolution | never {
    try {
      return new ExemplarSolution(program, source)
    } catch (error: unknown) {
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
