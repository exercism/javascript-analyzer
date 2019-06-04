import { Bootstrap } from './utils/bootstrap'
import { find } from './analyzers/Autoload'
import { run } from './utils/runner'

// The bootstrap call uses the arguments passed to the process to figure out
// which exercise to target, where the input lives (directory input) and what
// execution options to set.
//
// analyze -dc two-fer ~/test/
//
// For example, if arguments are passed directly, the above will run the two-fer
// exercise analyzer with the ~/test/ input directory and turning on debug and
// console logging.
//
const { exercise, options, input, logger } = Bootstrap.call()

logger.log('=> DEBUG mode is on')
logger.log(`=> exercise: ${exercise.slug}`)

// The autoloader knows where an analyzer should live and tries to require it
// so it can be instantiated here. This allows us to add new analyzers without
// needing to update a bookkeeping construct
//
const AnalyzerClass = find(exercise)
const analyzer = new AnalyzerClass()

// The runner uses the execution options to determine what should happen with
// the output. For example the --dry flag will make sure there is nothing
// written to a file.
//
// The basis for the runner is calling analyzer.run(input) -- the output is then
// logged and/or written to a file.
//
run(analyzer, input, options)
  .then(() => process.exit(0))
  .catch((err: any) => logger.fatal(err.toString()))

