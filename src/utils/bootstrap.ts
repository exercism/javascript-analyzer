import { ExecutionOptionsImpl } from './execution_options'
import { Logger, setProcessLogger as setGlobalLogger } from '../utils/logger'
import { DirectoryInput } from '../input/DirectoryInput';
import { GENERIC_FAILURE } from '../errors/codes';
import { ExerciseImpl } from '../ExerciseImpl';

export interface BootstrapResult {
  exercise: Exercise
  input: DirectoryInput
  options: ExecutionOptions
  logger: Logger
}

/**
 * The bootstrap call uses the arguments passed to the process to figure out
 * which exercise to target, where the input lives (directory input) and what
 * execution options to set.
 *
 * <entry> -dc two-fer ~/test/
 *
 * For example, if arguments are passed directly, the above will run the two-fer
 * exercise analyzer with the ~/test/ input directory and turning on debug and
 * console logging.
 */
export class Bootstrap {

  /**
   * Builds execution options, exercise and input based on the process arguments
   *
   */
  static call(): BootstrapResult {

    process.on('uncaughtException', function<T extends Error & { code?: number }>(err: T) {
      console.error(err)
      process.stderr.write(err.message)

      process.exit('code' in err ? err.code : GENERIC_FAILURE)
    })

    const options   = ExecutionOptionsImpl.create()
    const logger    = new Logger(options)
    const exercise  = new ExerciseImpl(options.exercise)
    const input     = new DirectoryInput(options.inputDir, exercise.slug)

    setGlobalLogger(logger)

    return { exercise, input, options, logger }
  }
}

