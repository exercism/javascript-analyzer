import { SOURCE_MISSING_ERROR } from "./codes";

export class NoSourceError extends Error {
  public readonly code: typeof SOURCE_MISSING_ERROR;

  constructor() {
    super('No source file(s) found')
    Error.captureStackTrace(this, this.constructor)

    this.code = SOURCE_MISSING_ERROR
  }
}
