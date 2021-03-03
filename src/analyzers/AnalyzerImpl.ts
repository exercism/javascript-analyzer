import type { Input } from '@exercism/static-analysis'
import { getProcessLogger, Logger } from '@exercism/static-analysis'
import type { Analyzer, Comment, Output } from '~src/interface'
import { AnalyzerOutput } from '~src/output/AnalyzerOutput'

class EarlyFinalization extends Error {
  constructor() {
    super('Early finalization')
    Object.setPrototypeOf(this, EarlyFinalization.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}

export abstract class AnalyzerImpl implements Analyzer {
  protected readonly logger: Logger
  private output!: AnalyzerOutput

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
   * overridden in a subclass. Subclasses should override @see execute instead.
   *
   * @returns The promise that resolves the analyzer output.
   *
   * @memberof BaseAnalyzer
   */
  public async run(input: Input): Promise<Output> {
    // Ensure each run has a fresh output
    //
    // Note: still need to wait for a run to complete before the next one can be
    //       started. We could work around this by providing an execution
    //       context that is fresh on each run.
    //
    // The reason output is not passed to execute, is that it doesn't _actually_
    // enforce the implementing analyzer to not use local state, so we don't
    // gain anything by it.
    //
    this.output = new AnalyzerOutput()

    await this.execute(input).catch((err): void | never => {
      if (err instanceof EarlyFinalization) {
        this.logger.log(`=> early finialization (${this.output.status})`)
      } else {
        throw err
      }
    })

    return this.output
  }

  /**
   * Approve the solution early with an optional comment.
   *
   * @see disapprove
   * @see redirect
   *
   * @param comment the optional comment to approve with
   * @throws {EarlyFinalization} used as control flow in @see run
   */
  protected approve(comment?: Comment): never {
    this.comment(comment)
    this.output.approve()

    throw new EarlyFinalization()
  }

  /**
   * Disapprove the solution early with an optional comment
   *
   * @see approve
   * @see redirect
   *
   * @param comment the optional comment to disapprove with
   * @throws {EarlyFinalization} used as control flow in @see run
   */
  protected disapprove(comment?: Comment): never {
    this.comment(comment)
    this.output.disapprove()

    throw new EarlyFinalization()
  }

  /**
   * Refer the solution to the mentor early with an optional comment
   *
   * @see approve
   * @see disapprove
   *
   * @param comment the optional comment to redirect with
   * @throws {EarlyFinalization} used as control flow in @see run
   */
  protected redirect(comment?: Comment): never {
    this.comment(comment)
    this.output.redirect()

    throw new EarlyFinalization()
  }

  /**
   * Add a comment to the output
   *
   * @param {Comment} [comment]
   */
  protected comment(comment?: Comment): void {
    if (!comment) {
      return
    }

    this.output.add(comment)
  }

  /**
   * Property that returns true if there is at least one comment in the output.
   */
  public get hasCommentary(): boolean {
    return this.output.comments.length > 0
  }

  /**
   * Execute the analyzer
   */
  protected abstract execute(input: Input): Promise<void>
}
