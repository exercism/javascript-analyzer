import type { Comment, ExecutionOptions, Output } from '~src/interface'

enum SolutionStatus {
  /**
   * This is the default situation and should be used when there is any
   * uncertainty.
   *
   * @deprecated don't return any status or use an {Essential} comment.
   * */
  Redirect = 'refer_to_mentor',
  /**
   * To be used when a solution matches pre-known optimal solutions or when a
   * solution can be approved but with a known improvement.
   *
   * @deprecated don't return any status or use a {Celebratory} comment.
   * */
  Approve = 'approve',
  /**
   * To be used when a solution can be disapproved as suboptimal and a comment
   * is provided.
   *
   * @deprecated replace with one or more comments with {Essential} or an
   *   {Actionable} type.
   **/
  Disapprove = 'disapprove',
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
  public summary?: string
  public comments: Comment[]

  constructor() {
    this.comments = []
  }

  /**
   * Mark the solution as approved
   * @deprecated add a {celebratory} or {informative} comment instead
   */
  public approve(): void {
    this.freeze()
  }

  /**
   * Mark the solution as dissapproved
   * @deprecated add an {actionable} or {essential} comment instead
   */
  public disapprove(): void {
    this.freeze()
  }

  /**
   * Mark the solution as refer to mentor
   * @deprecated do nothing, or add an {actionable} or {essential} comment instead
   */
  public redirect(): void {
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

  public freeze(summary?: string): void {
    this.summary = summary || this.summary

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
  public toProcessable({
    noTemplates,
    pretty,
  }: Pick<ExecutionOptions, 'noTemplates' | 'pretty'>): Promise<string> {
    return Promise.resolve(
      JSON.stringify(
        {
          ...(this.summary ? { summary: this.summary } : {}),
          comments: this.comments.map(
            noTemplates ? makeIsolatedComment : makeExternalComment
          ),
        },
        null,
        pretty ? 2 : 0
      )
    )
  }
}

type OutputableComment = {
  comment: string
  params?: Comment['variables']
  type?: Comment['type']
}

function makeExternalComment(comment: Comment): OutputableComment {
  const result: OutputableComment = {
    comment: comment.externalTemplate,
    params: comment.variables,
    type: comment.type,
  }

  if (!comment.variables || Object.keys(comment.variables).length === 0) {
    delete result.params
  }

  return result
}

function makeIsolatedComment(comment: Comment): OutputableComment {
  const result: OutputableComment = {
    comment: comment.template,
    params: comment.variables,
    type: comment.type,
  }

  if (!comment.variables || Object.keys(comment.variables).length === 0) {
    delete result.params
  }

  return result
}
