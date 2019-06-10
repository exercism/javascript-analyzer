import { AnalyzerOutput } from "./AnalyzerOutput";

export class EarlyFinalization extends Error {
  constructor() {
    super('Early finalization')
    Object.setPrototypeOf(this, EarlyFinalization.prototype);
    Error.captureStackTrace(this, this.constructor)
  }
}

export class IsolatedAnalyzerOutput extends AnalyzerOutput implements WritableOutput {

/**
   * Mark the solution as approved
   */
  public approve(comment?: Comment) {
    comment && this.add(comment)
    super.approve()
  }

  /**
   * Mark the solution as dissapproved
   */
  public disapprove(comment?: Comment) {
    comment && this.add(comment)
    super.disapprove()
  }

  /**
   * Mark the solution as refer to mentor
   */
  public redirect(comment?: Comment) {
    comment && this.add(comment)
    super.freeze()
  }

  protected freeze() {
    super.freeze()
    throw new EarlyFinalization()
  }

  get hasCommentary(): boolean {
    return this.comments.length > 0
  }
}
