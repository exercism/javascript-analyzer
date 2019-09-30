import { SOURCE_MISSING_ERROR } from "./codes";

export class NoSourceError extends Error {
  public readonly code: typeof SOURCE_MISSING_ERROR;
  public readonly expected: string;
  public readonly available: string[];

  constructor(expected?: string, available?: string[]) {
    super(
      expected
        ? `Expected source file "${expected}", found: ${JSON.stringify(available)}`
        : 'No source file(s) found'
    )

    this.expected = expected || '<unknown>'
    this.available = available || []

    Error.captureStackTrace(this, this.constructor)

    this.code = SOURCE_MISSING_ERROR
  }
}
