import type { ParserError } from '@exercism/static-analysis'
import { Source } from '~src/analyzers/SourceImpl'
import { PARSE_ERROR } from '~src/comments/shared'
import type { Output } from '~src/interface'
import { AnalyzerOutput } from './AnalyzerOutput'

/**
 * Makes a generic output, based on a ParserError
 *
 * @export
 * @param {ParserError} err
 * @returns {Output}
 */
export function makeParseErrorOutput(err: ParserError): Output {
  const output = new AnalyzerOutput()

  const { message, ...details } = err.original
  const source = new Source(err.source || '')

  const startLine = details.lineNumber - 2
  const endLine = details.lineNumber + 3 /* last line might be empty */

  // Select all the source code until a few lines after the error. The end line
  // is denoted by endline. The rest of the options fakes a "parsed source".
  //
  const surroundingSource = source.getLines(0, endLine)

  // Insert the marker BELOW, where the parse error occurred
  //           -------^
  //
  surroundingSource.splice(
    details.lineNumber,
    0,
    '^'.padStart(details.column + 1, '-')
  )

  // Create the error message, but only show few lines before ... after the
  // parse error location. These are denoted by startLine (and the source
  // array was already limited to endLine).
  //
  output.add(
    PARSE_ERROR({
      error: message,
      details: surroundingSource.slice(Math.max(0, startLine - 1)).join('\n'),
    })
  )

  output.redirect()
  process.exitCode = err.code

  return output
}
