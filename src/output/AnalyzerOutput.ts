import { Comment } from '../comments/comment'

enum SolutionStatus {
  /** This is the default situation and should be used when there is any uncertainty. */
  Redirect = 'refer_to_mentor',
  /** To be used when a solution matches pre-known optimal solutions */
  ApproveAsOptimal = 'approve_as_optimal',
  /** To be used when a solution can be approved but with a known improvement. */
  ApproveWithComment = 'approve_with_comment',
  /** To be used when a solution can be disapproved as suboptimal and a comment is provided. */
  DisapproveWithComment = 'disapprove_with_comment'
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
  public approve() {
    this.status = this.comments.length === 0
      ? SolutionStatus.ApproveAsOptimal
      : SolutionStatus.ApproveWithComment
  }

  /**
   * Mark the solution as dissapproved
   */
  public disapprove() {
    this.status = SolutionStatus.DisapproveWithComment
  }

  /**
   * Mark the solution as refer to mentor
   */
  public redirect() {
    this.status = SolutionStatus.Redirect
  }

  /**
   * Add a comment
   *
   * @param {Comment} comment the comment to add
   * @returns self
   */
  public add(comment: Comment) {
    this.comments.push(comment)
    return this
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
  toProcessable({ templates }: ExecutionOptions): Promise<string> {
    return Promise.resolve(
      JSON.stringify({
        status: this.status,
        comments: this.comments.map(templates ? makeExternalComment : makeIsolatedComment)

      })
    )
  }
}

function makeExternalComment(comment: Comment) {
  if (!comment.variables || Object.keys(comment.variables).length === 0) {
    return comment.externalTemplate
  }

  return {
    comment: comment.externalTemplate,
    params: comment.variables
  }
}

function makeIsolatedComment(comment: Comment) {
  if (!comment.variables || Object.keys(comment.variables).length === 0) {
    return comment.message
  }

  return {
    comment: comment.template,
    params: comment.variables
  }
}

