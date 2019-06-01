import { parse as parseToTree, TSESTreeOptions as ParserOptions } from '@typescript-eslint/typescript-estree'
import { Program } from '@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree'

import { Solution } from '../solution'
import { get as getLogger, Logger } from '../utils/logger'

import { AnalyzerOutput } from './analyzer_output'
import { Comment } from '../comments/comment'

class EarlyFinalization extends Error {
  constructor() {
    super('Early finalization')
    Object.setPrototypeOf(this, EarlyFinalization.prototype);
    Error.captureStackTrace(this, this.constructor)
  }
}

export abstract class BaseAnalyzer {
  protected readonly logger: Logger
  protected readonly output: AnalyzerOutput

  /**
   * The parser options passed to typescript-estree.parse
   *
   * @readonly
   * @static
   * @type {(ParserOptions | undefined)}
   */
  static get parseOptions(): ParserOptions | undefined {
    return undefined
  }

  /**
   * Creates an instance of an analyzer
   *
   * @param {Solution} solution the solution
   */
  constructor(protected readonly solution: Solution) {
    this.logger = getLogger()
    this.output = new AnalyzerOutput()
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
  public async run(): Promise<AnalyzerOutput> {
    await this.execute()
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
   *
   * @readonly
   * @memberof BaseAnalyzer
   */
  get hasCommentary() {
    return this.output.comments.length > 0
  }

  /**
   * Execute the analyzer
   *
   * @protected
   * @abstract
   * @returns {Promise<void>}
   * @memberof BaseAnalyzer
   */
  protected abstract execute(): Promise<void>

  /**
   * Read n files from the solution
   *
   * @param solution
   * @param n
   * @returns
   */
  protected static read(solution: Solution, n: number): Promise<Buffer[]> {
    return solution.read(n)
  }

  /**
   * Parse a solution's files
   *
   * @param solution
   * @param n number of files expected
   * @returns n programs
   */
  protected static async parse(solution: Solution, n = 1): Promise<{ program: Program, source: string }[]> {
    const sourceBuffers = await this.read(solution, n)
    const sources = sourceBuffers.map(source => source.toString())
    const logger = getLogger()

    logger.log(`=> inputs: ${sources.length}`)
    sources.forEach(source => logger.log(`\n${source}\n`))

    return sources.map(source => ({ program: parseToTree(source, this.parseOptions), source }))
  }
}
