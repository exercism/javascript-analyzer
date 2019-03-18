import { Solution } from "../solution"
import { get as getLogger, Logger } from "../utils/logger"
import { AnalyzerOutput } from "./analyzer_output"
import { parse as parseToTree, ParserOptions } from '@typescript-eslint/typescript-estree'
import { Comment, factory } from "./comment";
import { Program } from "@typescript-eslint/typescript-estree/dist/ts-estree/ts-estree";

class EarlyFinalization extends Error {
  constructor() {
    super("early finalization")
    Object.setPrototypeOf(this, EarlyFinalization.prototype);
    Error.captureStackTrace(this, this.constructor)
  }
}

type Comments = { [name: string]: ReturnType<typeof factory> }
type FactoryResultParameter = Parameters<ReturnType<typeof factory>>

export class BaseAnalyzer {
  protected readonly logger: Logger
  protected readonly output: AnalyzerOutput

  static get parseOptions(): ParserOptions | undefined {
    return undefined
  }

  constructor(protected readonly solution: Solution) {
    this.logger = getLogger()
    this.output = new AnalyzerOutput()
  }

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
   * Approve the solution early with an optional comment
   * @param comment
   */
  protected approve(comment?: Comment): never {
    this.comment(comment)
    this.output.approve()

    throw new EarlyFinalization()
  }

  /**
   * Disapprove the solution early with an optional comment
   * @param comment
   */
  protected disapprove(comment?: Comment) {
    this.comment(comment)
    this.output.disapprove()

    throw new EarlyFinalization()
  }

  /**
   * Refer the solution to the mentor early with an optional comment
   * @param symbol
   */
  protected redirect(comment?: Comment): never {
    this.comment(comment)
    this.output.redirect()

    throw new EarlyFinalization()
  }

  protected comment(comment?: Comment) {
    if (!comment) {
      return
    }

    this.output.add(comment)
  }

  get hasCommentary() {
    return this.output.comments.length > 0
  }

  protected execute(): Promise<void> {
    throw new Error(`You must overwrite "execute(): Promise<void> in ${this.constructor.name}"`)
  }

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
