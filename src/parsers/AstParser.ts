import { parse as parseToTree, TSESTree, TSESTreeOptions } from "@typescript-eslint/typescript-estree";
import { NoSourceError } from '~src/errors/NoSourceError';
import { ParserError } from "~src/errors/ParserError";
import { getProcessLogger } from "~src/utils/logger";

type Program = TSESTree.Program

export class ParsedSource {
  constructor(public readonly program: Program, public readonly source: string) {}
}

export class AstParser {
  constructor(private readonly options?: TSESTreeOptions, private readonly n = 1) {
  }

  /**
   * Parse a files into an AST tree
   *
   * @param solution
   * @returns n programs
   */
  public async parse(input: Input): Promise<ParsedSource[]> {
    const sources = await input.read(this.n)

    const logger = getProcessLogger()

    logger.log(`=> inputs: ${sources.length}`)
    sources.forEach((source): void => logger.log(`\n${source}\n`))

    if (sources.length === 0) {
      throw new NoSourceError()
    }

    try {
      return sources.map((source): ParsedSource => new ParsedSource(parseToTree(source, this.options), source))
    } catch(error) {
      throw new ParserError(error)
    }
  }
}
