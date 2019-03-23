import path from 'path'

import { BaseAnalyzer } from './analyzers/base_analyzer'

import { ExecutionOptions } from './utils/execution_options'
import { get as getLogger } from './utils/logger'
import { AnalyzerOutput } from './analyzers/analyzer_output';

export class Runner {

  /**
   * Run a specific analyzer, given a set of execution options
   *
   * @param analyzer the analyzer to run
   * @param options the options
   *
   */
  static async call(analyzer: BaseAnalyzer, options: ExecutionOptions): Promise<AnalyzerOutput> {
    return await options.dry
      ? DryRunner.call(analyzer, options)
      : WetRunner.call(analyzer, options)
  }
}

class DryRunner {
  static async call(analyzer: BaseAnalyzer, options: ExecutionOptions): Promise<AnalyzerOutput> {
    const logger = getLogger()
    const analysis = await analyzer.run()

    logger.log(`=> output: \n\n${analysis.toString(options)}\n`)
    logger.log('=> running dry, no writing to file')

    return Promise.resolve(analysis)
  }
}

class WetRunner {
  static async call(analyzer: BaseAnalyzer, options: ExecutionOptions): Promise<AnalyzerOutput> {
    const logger = getLogger()
    const analysis = await analyzer.run()

    const { output, inputDir } = options
    const outputPath = path.isAbsolute(output)
      ? output
      : path.join(inputDir, output)

    logger.log(`=> output: \n\n${analysis.toString(options)}\n`)
    logger.log(`=> writing to ${outputPath}`)

    return analysis.writeTo(outputPath, options)
      .then(() => analysis)
  }
}
