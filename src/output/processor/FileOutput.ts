import { getProcessLogger, writeFile } from '@exercism/static-analysis'
import path from 'path'

import type { ExecutionOptions, OutputProcessor } from '~src/interface'

type FileOutputOptions = Pick<ExecutionOptions, 'output' | 'outputDir'>

// eslint-disable-next-line @typescript-eslint/naming-convention
export const FileOutput: OutputProcessor = async (
  previous: Promise<string>,
  options: FileOutputOptions
): Promise<string> => {
  const output = await previous
  const outputPath = getOutputPath(options)
  getProcessLogger().log(`=> writing output to ${outputPath}`)

  return writeFile(outputPath, output).then(() => output)
}

function getOutputPath({ output, outputDir }: FileOutputOptions): string {
  return path.isAbsolute(output) ? output : path.join(outputDir, output)
}
