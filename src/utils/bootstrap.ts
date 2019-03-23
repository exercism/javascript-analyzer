import { Exercise } from '../exercise'
import { Solution } from '../solution'
import { ExecutionOptions } from './execution_options'
import { Logger, set as setGlobalLogger } from '../utils/logger'

export interface BootstrapResult {
  exercise: Exercise
  solution: Solution
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
    const solution  = new Solution(options.inputDir, exercise)

    setGlobalLogger(logger)

    return { exercise, solution, options, logger }
  }
}

