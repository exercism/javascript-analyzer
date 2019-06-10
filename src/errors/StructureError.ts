import { STRUCTURE_ERROR_UNCAUGHT } from "./codes";

export class StructureError extends Error {
  public readonly code = STRUCTURE_ERROR_UNCAUGHT

  constructor(message: string) {
    super(message)

    Error.captureStackTrace(this, this.constructor)
  }
}
