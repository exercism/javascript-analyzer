import { LogOutput } from '../output/processor/LogOutput'
import { FileOutput } from '../output/processor/FileOutput'
import { PassThroughOutput } from '../output/processor/PassThroughOutput'

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
  // This actually runs the analyzer and is the bases for any run. The options
  // currently only affect the output.
  const analysis = await analyzer.run(input)

  // An output processor gets the Promise to the previous output processor and
  // can add its own side-effects or transformation.
  const processors: OutputProcessor[] = [

    // Sends the output to the logger
    LogOutput,

    // Sends the output to a file
    options.dry ? PassThroughOutput : FileOutput
  ]

  return process(options, analysis, ...processors)
}

async function process(options: Readonly<ExecutionOptions>, analysis: Output, ...processors: OutputProcessor[]): Promise<Output> {
  await processors.reduce((previous, processor): Promise<string> => processor(previous, options), analysis.toProcessable(options))
  return analysis
}
