import fs from 'fs'
import path from 'path'

import { Comment } from './comment'

export type SolutionStatus = 'refer_to_mentor' | 'approve_as_optimal' | 'approve_with_comment' | 'disapprove_with_comment'

const OUTPUT_FILE = 'analysis.json'

export class AnalyzerOutput {
  public status: SolutionStatus
  public comments: Comment[]

  constructor() {
    this.status = "refer_to_mentor"
    this.comments = []
  }

  public approve() {
    this.status = this.comments.length === 0 ? "approve_as_optimal" : "approve_with_comment"
  }

  public disapprove() {
    this.status = "disapprove_with_comment"
  }

  public redirect() {
    this.status = "refer_to_mentor"
  }

  public add(comment: Comment) {
    this.comments.push(comment)
    return this
  }

  public toString(): string {
    // Currently we want strings, but change to the following if that's fixed:
    return JSON.stringify(this, null, 2)
  }

  public writeTo(dir: string): Promise<void> {
    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(dir, OUTPUT_FILE), this.toString(), (err) => {
        err ? reject(err) : resolve()
      })
    })
  }
}
