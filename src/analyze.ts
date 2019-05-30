import { Bootstrap } from './utils/bootstrap'
import { find } from './analyzers/Autoload'
import { run } from './runner'

const { exercise, options, input, logger } = Bootstrap.call()

logger.log('=> DEBUG mode is on')
logger.log(`=> exercise: ${exercise.slug}`)

const AnalyzerClass = find(exercise)
const analyzer = new AnalyzerClass()

run(analyzer, input, options)
  .then(() => process.exit(0))
  .catch((err: any) => logger.fatal(err.toString()))

