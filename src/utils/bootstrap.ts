import { Exercise } from '../exercise'
import { Solution } from '../solution'
import { ExecutionOptions } from './execution_options'

const args = process.argv.slice(2)
const options = ExecutionOptions.from(args);
const [slug, inputDir] = args

const exercise = new Exercise(slug)
const solution = new Solution(inputDir, exercise)
const outputDir = inputDir

export { exercise, solution, options, outputDir }
