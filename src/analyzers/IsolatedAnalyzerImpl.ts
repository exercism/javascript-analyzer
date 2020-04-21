import { NoSourceError } from '~src/errors/NoSourceError';
import { ParserError } from '~src/errors/ParserError';
import { EarlyFinalization, IsolatedAnalyzerOutput } from '~src/output/IsolatedAnalyzerOutput';
import { getProcessLogger as getLogger, Logger } from '~src/utils/logger';
import { makeNoSourceOutput } from '~src/output/makeNoSourceOutput';
import { makeParseErrorOutput } from '~src/output/makeParseErrorOutput';
import { Analyzer, Output, Input, WritableOutput } from '~src/interface';

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
    return this.run_(input)
      .catch((err: Error) => {

        // Here we handle errors that blew up the analyzer but we don't want to
        // report as blown up. This converts these errors to the commentary.
        if (err instanceof NoSourceError) {
          return makeNoSourceOutput(err)
        } else if (err instanceof ParserError) {
          return makeParseErrorOutput(err)
        }

        // Unhandled issue
        return Promise.reject(err)
      })
  }

  private async run_(input: Input): Promise<Output> {
    const output = new IsolatedAnalyzerOutput()

    // Block and execute
    await this.execute(input, output)
      .catch((err): void | never => {

        // The isolated analyzer output can use exceptions as control flow.
        // This block here explicitely accepts this.
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
