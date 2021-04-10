import {
  DirectoryInput,
  Input,
  Logger,
  registerExceptionHandler,
  setProcessLogger,
  DirectoryWithConfigInput,
} from '@exercism/static-analysis'
import { ExerciseImpl } from '~src/ExerciseImpl'
import { ExecutionOptions, Exercise } from '~src/interface'
import { ExecutionOptionsImpl } from './execution_options'

export interface BootstrapResult {
  exercise: Exercise
  input: Input
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
  public static call(): BootstrapResult {
    registerExceptionHandler()

    const options = ExecutionOptionsImpl.create()
    const logger = new Logger(options)
    const exercise = new ExerciseImpl(options.exercise)
    const input = DirectoryWithConfigInput.test(options.inputDir)
      ? new DirectoryWithConfigInput(options.inputDir)
      : new DirectoryInput(options.inputDir, exercise.slug)

    setProcessLogger(logger)

    return { exercise, input, options, logger }
  }
}
