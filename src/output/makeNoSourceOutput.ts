import type { NoSourceError } from '@exercism/static-analysis'
import { ERROR_CAPTURED_NO_SOURCE } from '~src/comments/shared'
import type { Output } from '~src/interface'
import { AnalyzerOutput } from './AnalyzerOutput'

/**
 * Makes a generic output based on a NoSourceError
 *
 * @export
 * @param {NoSourceError} err
 * @returns {Output}
 */
export function makeNoSourceOutput(err: NoSourceError): Output {
  const output = new AnalyzerOutput()

  output.add(
    ERROR_CAPTURED_NO_SOURCE({
      expected: err.expected,
      available: err.available.join(', '),
    })
  )

  output.redirect()
  process.exitCode = err.code

  return output
}
