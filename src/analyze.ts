import { Bootstrap } from './utils/bootstrap'
import { Analyzers } from './analyzers'
import { Runner } from './runner'

const { exercise, options, solution, logger } = Bootstrap.call()

logger.log('=> DEBUG mode is on')
logger.log(`=> exercise: ${exercise.slug}`)

const AnalyzerClass = Analyzers.find(exercise)
const analyzer = new AnalyzerClass(solution)

Runner.call(analyzer, options)
  .then(() => process.exit(0))
  .catch((err) => logger.fatal(err.toString()))
