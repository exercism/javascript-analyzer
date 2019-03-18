import { BaseAnalyzer } from './base_analyzer'
import { Exercise } from '../exercise'
import { get as getLogger } from '../utils/logger'
import { type } from 'os';

export class Analyzers {
  public static find(exercise: Readonly<Exercise>): typeof BaseAnalyzer {
    const logger = getLogger()
    const file = require(`./${exercise.slug}`)
    const key = Object.keys(file).find(key => file[key] instanceof Function)

    if (key === undefined) {
      return logger.fatal(`No Analyzer found in './${exercise.slug}`)
    }

    const analyzer = file[key]
    logger.log(`=> analyzer: ${analyzer.name}`)
    return analyzer
  }
}