import type { Comment, WritableOutput } from '~src/interface'
import { AnalyzerOutput } from './AnalyzerOutput'

export class EarlyFinalization extends Error {
  constructor() {
    super('Early finalization')
    Object.setPrototypeOf(this, EarlyFinalization.prototype)
    Error.captureStackTrace(this, this.constructor)
  }
}

export class IsolatedAnalyzerOutput
  extends AnalyzerOutput
  implements WritableOutput
{
  /**
   * Mark the solution as approved
   * @deprecated add a {celebratory} or {informative} comment instead
   */
  public approve(comment?: Comment): never {
    comment && this.add(comment)
    return this.freeze()
  }

  /**
   * Mark the solution as dissapproved
   * @deprecated add an {actionable} or {essential} comment instead
   */
  public disapprove(comment?: Comment): never {
    comment && this.add(comment)
    return this.freeze()
  }

  /**
   * Mark the solution as refer to mentor
   * @deprecated do nothing, or add an {actionable} or {essential} comment instead
   */
  public redirect(comment?: Comment): never {
    comment && this.add(comment)
    return this.freeze()
  }

  public finish(summary?: string): never {
    return this.freeze(summary)
  }

  public freeze(summary?: string): never {
    this.summary = summary || this.summary

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
