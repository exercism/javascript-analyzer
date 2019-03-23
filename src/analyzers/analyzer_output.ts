import fs from 'fs'

import { Comment } from './comment'
import { ExecutionOptions } from '../utils/execution_options';

export type SolutionStatus =
    'refer_to_mentor'
  | 'approve_as_optimal'
  | 'approve_with_comment'
  | 'disapprove_with_comment'

export class AnalyzerOutput {
  public status: SolutionStatus
  public comments: Comment[]

  constructor() {
    this.status = 'refer_to_mentor'
    this.comments = []
  }

  public approve() {
    this.status = this.comments.length === 0
      ? 'approve_as_optimal'
      : 'approve_with_comment'
  }

  public disapprove() {
    this.status = 'disapprove_with_comment'
  }

  public redirect() {
    this.status = 'refer_to_mentor'
  }

  public add(comment: Comment) {
    this.comments.push(comment)
    return this
  }

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

  public writeTo(path: string, options: ExecutionOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, this.toString(options), (err) => {
        err ? reject(err) : resolve()
      })
    })
  }
}
