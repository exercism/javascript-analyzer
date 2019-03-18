import { exercise, solution, options, outputDir } from './utils/bootstrap'
import { Logger, set as setGlobalLogger } from './utils/logger'
import { Analyzers } from './analyzers'
import { run } from './run';

const logger = setGlobalLogger(new Logger(options))
logger.log('=> DEBUG mode is on')
logger.log(`=> exercise: ${exercise.slug}`)

const AnalyzerClass = Analyzers.find(exercise)
const analyzer = new AnalyzerClass(solution)

run(analyzer, outputDir)
  .then(() => process.exit(0))
  .catch((err) => logger.fatal(err.toString()))
