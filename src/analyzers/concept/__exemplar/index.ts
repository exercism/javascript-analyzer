import type { Input } from '@exercism/static-analysis'
import {
  AstParser,
  NoExportError,
  NoMethodError,
} from '@exercism/static-analysis'
import type { TSESTree } from '@typescript-eslint/typescript-estree'
import { IsolatedAnalyzerImpl } from '~src/analyzers/IsolatedAnalyzerImpl.js'
import {
  EXEMPLAR_SOLUTION,
  NO_METHOD,
  NO_NAMED_EXPORT,
} from '~src/comments/shared.js'
import type { ExecutionOptions, WritableOutput } from '~src/interface.d.js'
import { ExemplarSolution } from './ExemplarSolution.js'

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
    } catch (error) {
      if (error instanceof NoMethodError) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        output.add(NO_METHOD({ 'method.name': error.method }))
        output.finish()
      }

      if (error instanceof NoExportError) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        output.add(NO_NAMED_EXPORT({ 'export.name': error.namedExport }))
        output.finish()
      }

      throw error
    }
  }
}

export default ExemplarAnalyzer
