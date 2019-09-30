import { SOURCE_PARSE_ERROR } from "./codes";

export class ParserError extends Error {
  public readonly code: typeof SOURCE_PARSE_ERROR;

  constructor(public readonly original: Error & { lineNumber: number; column: number; index: number }, public readonly source?: string) {
    super(`
Could not parse the source; most likely due to a syntax error.

Original error:
${original.message}
    `.trim())

    Error.captureStackTrace(this, this.constructor)
    this.code = SOURCE_PARSE_ERROR
  }
}

