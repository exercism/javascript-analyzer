import { parse as parseToTree, TSESTree, TSESTreeOptions } from "@typescript-eslint/typescript-estree";
import { NoSourceError } from '~src/errors/NoSourceError';
import { ParserError } from "~src/errors/ParserError";
import { getProcessLogger } from "~src/utils/logger";

type Program = TSESTree.Program

export class AstParser {
  public constructor(private readonly options?: TSESTreeOptions, private readonly n = 1) {
  }

  /**
   * Parse a files into an AST tree
   *
   * @param solution
   * @returns n programs
   */
  async parse(input: Input): Promise<{ program: Program, source: string }[]> {
    const sources = await input.read(this.n)

    const logger = getProcessLogger()

    logger.log(`=> inputs: ${sources.length}`)
    sources.forEach(source => logger.log(`\n${source}\n`))

    if (sources.length === 0) {
      throw new NoSourceError()
    }

    try {
      return sources.map(source => new ParsedSource(parseToTree(source, this.options), source))
    } catch(error) {
      throw new ParserError(error)
    }
  }
}

export class ParsedSource {
  public constructor(public readonly program: Program, public readonly source: string) {}
}
