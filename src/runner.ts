import { ExecutionOptions } from './utils/execution_options'

import { LogOutput } from './output/processor/LogOutput'
import { FileOutput } from './output/processor/FileOutput'
import { PassThroughOutput } from './output/processor/PassThroughOutput'

/**
 * Run a specific analyzer, given a set of execution options
 *
 * @param analyzer the analyzer to run
 * @param input the input (source of the solution)
 * @param options the options
 *
 * @returns the output
 *
 */
export async function run(analyzer: Analyzer, input: Input, options: ExecutionOptions): Promise<Output> {
  const analysis = await analyzer.run(input)

  const processors: OutputProcessor[] = [
    LogOutput,
    options.dry ? PassThroughOutput : FileOutput
  ]

  return process(options, analysis, ...processors)
}

async function process(options: Readonly<ExecutionOptions>, analysis: Output, ...processors: OutputProcessor[]): Promise<Output> {
  await processors.reduce((previous, processor) => processor(previous, options), analysis.toProcessable(options))
  return analysis
}
