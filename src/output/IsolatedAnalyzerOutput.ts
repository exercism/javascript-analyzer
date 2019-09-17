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
  public approve(comment?: Comment): never {
    comment && this.add(comment)
    super.approve()
    return this.freeze()
  }

  /**
   * Mark the solution as dissapproved
   */
  public disapprove(comment?: Comment): never {
    comment && this.add(comment)
    super.disapprove()
    return this.freeze()
  }

  /**
   * Mark the solution as refer to mentor
   */
  public redirect(comment?: Comment): never {
    comment && this.add(comment)
    return this.freeze()
  }

  protected freeze(): never {
    super.freeze()
    throw new EarlyFinalization()
  }

  public get commentCount(): number {
    return this.comments.length
  }

  public get hasCommentary(): boolean {
    return this.commentCount > 0
  }
}
