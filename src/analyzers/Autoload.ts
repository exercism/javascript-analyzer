import { Exercise } from '../exercise'

import path from 'path'

import { getProcessLogger } from '../utils/logger'

type AnalyzerConstructor = new () => Analyzer

/**
 * Find an analyzer for a specific exercise
 *
 * @param exercise The exericse
 * @returns the Analyzer constructor
 */
export function find(exercise: Readonly<Exercise>): AnalyzerConstructor {
  const file = autoload(exercise)
  const key = Object.keys(file).find(key => file[key] instanceof Function)

  if (key === undefined) {
    throw new Error(`No Analyzer found in './${exercise.slug}`)
  }

  const analyzer = file[key]
  getProcessLogger().log(`=> analyzer: ${analyzer.name}`)
  return analyzer
}

function autoload(exercise: Readonly<Exercise>) {
  const modulePath = path.join(__dirname, exercise.slug, 'index') // explicit path (no extension)
  try {
    return require(modulePath)
  } catch(err) {
    const logger = getProcessLogger()
    logger.error(`
Could not find the index.js analyzer in "${modulePath}"

Make sure that:
- the slug "${exercise.slug}" is valid (hint: use dashes, not underscores)
- there is actually an analyzer written for that exercise

Original error:

`.trimLeft())
    logger.fatal(JSON.stringify(err), -32)
  }
}
