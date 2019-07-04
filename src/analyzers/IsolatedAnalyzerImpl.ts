import { getProcessLogger as getLogger, Logger } from '~src/utils/logger'

import { IsolatedAnalyzerOutput, EarlyFinalization } from '~src/output/IsolatedAnalyzerOutput';

export abstract class IsolatedAnalyzerImpl implements Analyzer {
  protected readonly logger: Logger

  /**
   * Creates an instance of an analyzer
   */
  constructor() {
    this.logger = getLogger()
  }

  /**
   * Runs the analyzer
   *
   * This is defined as a property instead of a method, so that it can not be
   * overriddden in a subclass. Subclasses should override @see execute instead.
   *
   * @returns The promise that resolves the analyzer output.
   *
   * @memberof BaseAnalyzer
   */
  public async run(input: Input): Promise<Output> {
    const output = new IsolatedAnalyzerOutput()
    await this.execute(input, output)
      .catch((err): void | never => {
        if (err instanceof EarlyFinalization) {
          this.logger.log(`=> early finialization (${output.status})`)
        } else {
          throw err
        }
      })

    return output
  }

  /**
   * Execute the analyzer
   */
  protected abstract execute(input: Input, output: WritableOutput): Promise<void>
}
