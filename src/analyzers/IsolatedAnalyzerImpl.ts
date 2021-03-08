import type { Input } from '@exercism/static-analysis'
import {
  getProcessLogger,
  Logger,
  NoSourceError,
  ParserError,
} from '@exercism/static-analysis'
import type {
  Analyzer,
  ExecutionOptions,
  Output,
  WritableOutput,
} from '~src/interface'
import {
  EarlyFinalization,
  IsolatedAnalyzerOutput,
} from '~src/output/IsolatedAnalyzerOutput'
import { makeNoSourceOutput } from '~src/output/makeNoSourceOutput'
import { makeParseErrorOutput } from '~src/output/makeParseErrorOutput'

export abstract class IsolatedAnalyzerImpl implements Analyzer {
  protected readonly logger: Logger

  /**
   * Creates an instance of an analyzer
   */
  constructor() {
    this.logger = getProcessLogger()
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
  public async run(input: Input, options: ExecutionOptions): Promise<Output> {
    return this.run_(input, options).catch((err: Error) => {
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

  private async run_(input: Input, options: ExecutionOptions): Promise<Output> {
    const output = new IsolatedAnalyzerOutput()

    // Block and execute
    await this.execute(input, output, options).catch((err): void | never => {
      // The isolated analyzer output can use exceptions as control flow.
      // This block here explicitly accepts this.
      if (err instanceof EarlyFinalization) {
        this.logger.log(`=> early finalization (${output.summary || '-'})`)
      } else {
        throw err
      }
    })

    return output
  }

  /**
   * Execute the analyzer
   */
  protected abstract execute(
    input: Input,
    output: WritableOutput,
    options: ExecutionOptions
  ): Promise<void>
}
