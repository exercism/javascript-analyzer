import { writeFile } from '~src/utils/fs'
import path from 'path'

import { getProcessLogger } from '~src/utils/logger'

type FileOutputOptions = Pick<ExecutionOptions, 'output' | 'outputDir'>

export const FileOutput: OutputProcessor = async (previous: Promise<string>, options: FileOutputOptions): Promise<string> => {
  const output = await previous
  const outputPath = getOutputPath(options)
  getProcessLogger().log(`=> writing output to ${outputPath}`)

  return writeFile(outputPath, output)
}

function getOutputPath({ output, outputDir }: FileOutputOptions): string {
  return path.isAbsolute(output)
    ? output
    : path.join(outputDir, output)
}
