import { Exercise } from '../exercise'
import { ExecutionOptions } from './execution_options'
import { Logger, setProcessLogger as setGlobalLogger } from '../utils/logger'
import { DirectoryInput } from '../input/DirectoryInput';

export interface BootstrapResult {
  exercise: Exercise
  input: DirectoryInput
  options: ExecutionOptions
  logger: Logger
}

export class Bootstrap {
  static call(): BootstrapResult {

    process.on('uncaughtException', function(err) {
      console.error(err)
      process.stderr.write(err.message)

      process.exit(-1)
    })

    const options   = ExecutionOptions.create()
    const logger    = new Logger(options)
    const exercise  = new Exercise(options.exercise)
    const input     = new DirectoryInput(options.inputDir, exercise.slug)

    setGlobalLogger(logger)

    return { exercise, input, options, logger }
  }
}

