import { StructureError } from "./StructureError";

export class NoExportError extends StructureError {
  constructor(public readonly namedExport: string) {
    super(`Could not find export "${namedExport}".`)

    Error.captureStackTrace(this, this.constructor)
  }
}
