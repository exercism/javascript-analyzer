import fs from 'fs'

import { Comment } from '../comments/comment'
import { ExecutionOptions } from '../utils/execution_options';

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
export class AnalyzerOutput {
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
   * @returns {string}
   */
  public toString(options: ExecutionOptions): string {
    return JSON.stringify({
      status: this.status,
      comments: this.comments.map((comment) => {
        if (!comment.variables || Object.keys(comment.variables).length === 0) {
          return options.templates ? comment.externalTemplate : comment.message
        }

        return {
          comment: options.templates ? comment.externalTemplate : comment.template,
          params: comment.variables
        }
      })
    }, null, 2)
  }

  /**
   * Writes self to `path`
   *
   * @param {string} path
   * @param {ExecutionOptions} options
   * @returns {Promise<void>} The future which resolves / rejects when its done
   */
  public writeTo(path: string, options: ExecutionOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, this.toString(options), (err) => {
        err ? reject(err) : resolve()
      })
    })
  }
}
