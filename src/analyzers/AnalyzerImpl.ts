import { getProcessLogger as getLogger, Logger } from '../utils/logger'

import { Comment } from '../comments/comment'
import { AnalyzerOutput } from '../output/AnalyzerOutput';
import { ParsedSource, AstParser } from '../parsers/AstParser';

class EarlyFinalization extends Error {
  constructor() {
    super('Early finalization')
    Object.setPrototypeOf(this, EarlyFinalization.prototype);
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
    // Ensure each run has a fresh output
    this.output = new AnalyzerOutput()

    await this.execute(input)
      .catch((err) => {
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
  protected disapprove(comment?: Comment) {
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
  protected comment(comment?: Comment) {
    if (!comment) {
      return
    }

    this.output.add(comment)
  }

  /**
   * Property that returns true if there is at least one comment in the output.
   */
  get hasCommentary() {
    return this.output.comments.length > 0
  }

  /**
   * Execute the analyzer
   */
  protected abstract execute(input: Input): Promise<void>
}
