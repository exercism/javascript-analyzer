import { StructureError } from "./StructureError";


export class NoMethodError extends StructureError {
  constructor(public readonly method: string) {
    super(`Could not find method "${method}".`)

    Error.captureStackTrace(this, this.constructor)
  }
}
