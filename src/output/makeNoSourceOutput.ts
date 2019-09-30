import { NoSourceError } from "~src/errors/NoSourceError"
import { AnalyzerOutput } from "./AnalyzerOutput"
import { ERROR_CAPTURED_NO_SOURCE } from "~src/comments/shared"

/**
 * Makes a generic output based on a NoSourceError
 *
 * @export
 * @param {NoSourceError} err
 * @returns {Output}
 */
export function makeNoSourceOutput(err: NoSourceError): Output {
  const output = new AnalyzerOutput()

  output.add(ERROR_CAPTURED_NO_SOURCE({
    expected: err.expected,
    available: err.available.join(', ')
  }))

  output.redirect()
  process.exitCode = err.code

  return output
}
