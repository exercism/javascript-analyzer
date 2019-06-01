import { BaseAnalyzer } from './base_analyzer'

import { Exercise } from '../exercise'
import { Solution } from '../solution'

import { get as getLogger } from '../utils/logger'

import path from 'path'

export class Analyzers {

  /**
   * Find the correct analyzer given an exercise
   *
   * @param exercise the exercise to lookup
   *
   * @throws if there is no such analyzer
   * @returns the constructor for the analyzer
   */
  public static find<T extends BaseAnalyzer>(exercise: Readonly<Exercise>): new (solution: Solution) => T  {
    const file = Analyzers.autoload(exercise)
    const key = Object.keys(file).find(key => file[key] instanceof Function)

    if (key === undefined) {
      throw new Error(`No Analyzer found in './${exercise.slug}`)
    }

    const analyzer = file[key]
    getLogger().log(`=> analyzer: ${analyzer.name}`)
    return analyzer
  }

  private static autoload(exercise: Readonly<Exercise>) {
    const modulePath = path.join(__dirname, exercise.slug, 'index') // explicit path (no extension)
    try {
      return require(modulePath)
    } catch(err) {
      const logger = getLogger()
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
}
