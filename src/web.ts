import { reportException } from '@exercism/static-analysis/dist/errors/handler'
import { InlineInput } from '@exercism/static-analysis/dist/input/InlineInput'
import type { Input } from '@exercism/static-analysis/dist/input/Input'
import {
  Logger,
  setProcessLogger as setGlobalLogger,
} from '@exercism/static-analysis/dist/utils/logger'
import { ExerciseImpl } from './ExerciseImpl'
import type {
  Analyzer,
  ExecutionOptions,
  Exercise,
  Output,
  OutputProcessor,
} from './interface'
import { LogOutput } from './output/processor/LogOutput'

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
async function internalRun(
  analyzer: Analyzer,
  input: Input,
  options: ExecutionOptions
): Promise<Output> {
  // This actually runs the analyzer and is the bases for any run. The options
  // currently only affect the output.
  const analysis = await analyzer.run(input, options)

  // An output processor gets the Promise to the previous output processor and
  // can add its own side-effects or transformation.
  const processors: OutputProcessor[] = [
    // Sends the output to the logger
    LogOutput,
  ]

  return process(options, analysis, ...processors)
}

async function process(
  options: Readonly<ExecutionOptions>,
  analysis: Output,
  ...processors: OutputProcessor[]
): Promise<Output> {
  await processors.reduce(
    (previous, processor): Promise<string> => processor(previous, options),
    analysis.toProcessable(options)
  )
  return analysis
}

export async function run(
  code: string[],
  analyzer: Analyzer,
  options: ExecutionOptions
): Promise<Output> {
  try {
    const logger: Logger = new Logger(options)
    const exercise: Exercise = new ExerciseImpl(options.exercise)
    const input: Input = new InlineInput(code)

    setGlobalLogger(logger)

    logger.log('=> DEBUG mode is on')
    logger.log(`=> exercise: ${exercise.slug}`)
    logger.log(
      `=> options: ${options.pretty ? 'pretty ' : ''}${
        options.noTemplates ? 'no-templates' : 'templates'
      } ${options.dry ? 'dry ' : ''}`
    )

    return await internalRun(analyzer, input, options)
  } catch (err) {
    reportException(err as Error)
  }
}
