import fs from 'fs'
import path from 'path'

import { getProcessLogger } from '../../utils/logger'

type FileOutputOptions = Pick<ExecutionOptions, 'output' | 'inputDir'>

export const FileOutput: OutputProcessor = async (previous: Promise<string>, options: FileOutputOptions): Promise<string> => {
  const output = await previous
  const outputPath = getOutputPath(options)
  getProcessLogger().log(`=> writing output to ${outputPath}`)

  return new Promise((resolve, reject) => {

    fs.writeFile(outputPath, output, (err) => {
      err ? reject(err) : resolve(output)
    })
  })
}

function getOutputPath({ output, inputDir }: FileOutputOptions): string {
  return path.isAbsolute(output)
    ? output
    : path.join(inputDir, output)
}
