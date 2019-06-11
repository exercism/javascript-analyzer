import { SOURCE_MISSING_ERROR } from "./codes";

export class NoSourceError extends Error {
  code = SOURCE_MISSING_ERROR

  constructor() {
    super('No source file(s) found')
    Error.captureStackTrace(this, this.constructor)
  }
}
