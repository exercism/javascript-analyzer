import { BaseAnalyzer } from './base_analyzer'

import { Exercise } from '../exercise'
import { Solution } from '../solution'

import { get as getLogger } from '../utils/logger'

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
    const file = require(`./${exercise.slug}`)
    const key = Object.keys(file).find(key => file[key] instanceof Function)

    if (key === undefined) {
      throw new Error(`No Analyzer found in './${exercise.slug}`)
    }

    const analyzer = file[key]
    getLogger().log(`=> analyzer: ${analyzer.name}`)
    return analyzer
  }
}
