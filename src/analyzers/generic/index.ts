import type { FileInput, Input } from '@exercism/static-analysis'
import {
  DirectoryInput,
  DirectoryWithConfigInput,
} from '@exercism/static-analysis'
import type { TSESTree } from '@typescript-eslint/typescript-estree'
import type { Linter } from 'eslint'
import fs from 'fs'
import type { ExecutionOptions, WritableOutput } from '~src/interface'
import { IsolatedAnalyzerImpl } from '../IsolatedAnalyzerImpl'
import path from 'path'
import { spawnSync } from 'child_process'

type Program = TSESTree.Program

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const SOLUTION_CONFIGURATION: Linter.Config = JSON.parse(`
{
  "root": true,
  "extends": "@exercism/eslint-config-javascript"
}
`)

const CONFIGURATION_OPTIONS = [
  '.eslintrc.js',
  '.eslintrc.cjs',
  '.eslintrc.yaml',
  '.eslintrc.yml',
  '.eslintrc.json',
  '.eslintrc',
]

export class GenericAnalyzer extends IsolatedAnalyzerImpl {
  protected async execute(
    input: Input,
    output: WritableOutput,
    options: ExecutionOptions
  ): Promise<void> {
    // const linter = new Linter({
    //   cwd: fs.existsSync(options.inputDir) ? options.inputDir : process.cwd(),
    // })

    if (
      !(
        input instanceof DirectoryInput ||
        input instanceof DirectoryWithConfigInput
      )
    ) {
      this.logger.log('Can only run GenericAnalyzer of inputs with Directory')
      output.finish()
    }

    if (!fs.existsSync(options.outputDir)) {
      this.logger.log(
        `Can only run GenericAnalyzer if output directory ${options.outputDir} exists`
      )
      output.finish()
    }

    await new Promise((resolve) => {
      fs.mkdir(path.join(options.outputDir, 'lint'), resolve)
    })

    // Read in the source files
    const files: FileInput[] = await input.files()

    // Write the source files in a new directory
    await Promise.all(
      files.map(async (file) => {
        const [data] = await file.read()

        return new Promise((resolve, reject) => {
          fs.writeFile(
            path.join(options.outputDir, 'lint', file.fileName),
            data,
            (err) => (err ? void reject(err) : void resolve(null))
          )
        })
      })
    )

    // Write the new configuration
    await new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(options.outputDir, 'lint', '.eslintrc.js'),
        JSON.stringify(SOLUTION_CONFIGURATION, undefined, 2),
        (err) => (err ? void reject(err) : void resolve(null))
      )
    })

    const root = path.resolve(__dirname, '..', '..', '..')

    // Run eslint
    const result = spawnSync(
      path.join(root, 'node_modules', '.bin', 'eslint'),
      ['lint', '-c', path.join('.', 'lint', '.eslintrc')],
      { cwd: options.outputDir, stdio: 'pipe' }
    )

    console.log(result.stdout, result.stderr, result.output)

    output.finish()
  }
}
