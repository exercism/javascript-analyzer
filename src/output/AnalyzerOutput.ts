enum SolutionStatus {
  /** This is the default situation and should be used when there is any
   *  uncertainty. */
  Redirect = 'refer_to_mentor',
  /** To be used when a solution matches pre-known optimal solutions or when a
   *  solution can be approved but with a known improvement. */
  Approve = 'approve',
  /** To be used when a solution can be disapproved as suboptimal and a comment
   *  is provided. */
  Disapprove = 'disapprove'
}

/**
 * The interface for the analyzer output is described [here][doc].
 *
 * [doc]: https://github.com/exercism/automated-mentoring-support/blob/master/docs/interface.md#output-format
 *
 * @export
 * @class AnalyzerOutput
 */
export class AnalyzerOutput implements Output {
  public status: SolutionStatus
  public comments: Comment[]

  constructor() {
    this.status = SolutionStatus.Redirect
    this.comments = []
  }

  /**
   * Mark the solution as approved
   */
  public approve(): void {
    this.status = SolutionStatus.Approve

    this.freeze()
  }

  /**
   * Mark the solution as dissapproved
   */
  public disapprove(): void {
    this.status = SolutionStatus.Disapprove

    this.freeze()
  }

  /**
   * Mark the solution as refer to mentor
   */
  public redirect(): void {
    this.status = SolutionStatus.Redirect

    this.freeze()
  }

  /**
   * Add a comment
   *
   * @param {Comment} comment the comment to add
   * @returns self
   */
  public add(comment: Comment): this {
    this.comments.push(comment)
    return this
  }

  protected freeze(): void {
    Object.freeze(this)
    Object.freeze(this.comments)
  }

  /**
   * Transforms the output into a structured data string for output.
   *
   * The format should match [the output format][doc].
   *
   * [doc]: https://github.com/exercism/automated-mentoring-support/blob/master/docs/interface.md#output-format
   *
   * @param {ExecutionOptions} options
   * @returns {Promise<string>}
   */
  public toProcessable({ noTemplates, pretty }: Pick<ExecutionOptions, 'noTemplates' | 'pretty'>): Promise<string> {
    return Promise.resolve(
      JSON.stringify({
        status: this.status,
        comments: this.comments.map(noTemplates ? makeIsolatedComment : makeExternalComment)
      }, null, pretty ? 2 : 0)
    )
  }
}

function makeExternalComment(comment: Comment): string | { comment: string; params: Comment['variables'] } {
  if (!comment.variables || Object.keys(comment.variables).length === 0) {
    return comment.externalTemplate
  }

  return {
    comment: comment.externalTemplate,
    params: comment.variables
  }
}

function makeIsolatedComment(comment: Comment): string | { comment: string; params: Comment['variables'] } {
  if (!comment.variables || Object.keys(comment.variables).length === 0) {
    return comment.message
  }

  return {
    comment: comment.template,
    params: comment.variables
  }
}

