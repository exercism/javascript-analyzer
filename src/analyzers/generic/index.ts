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
} from '../../comments/shared'
import { IsolatedAnalyzerImpl } from '../IsolatedAnalyzerImpl'
import { ESLint } from 'eslint'

type Program = TSESTree.Program

export class GenericAnalyzer extends IsolatedAnalyzerImpl {
  protected async execute(
    input: Input,
    output: WritableOutput,
    options: ExecutionOptions
  ): Promise<void> {
    // 1. Create an instance.
    const eslint = new ESLint()

    // 2. Lint files.
    const results = await eslint.lintFiles(['lib/**/*.js'])

    // 3. Format the results.
    const formatter = await eslint.loadFormatter('json-with-metadata')
    const resultText = formatter.format(results)

    // 4. Output it.
    console.log(resultText)

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
