import { GENERIC_FAILURE } from "./codes";

export function registerExceptionHandler(): void {
  process.on('uncaughtException', reportException)
}

function reportException<T extends Error & { message: string; code?: number }>(err: T): void
function reportException<T extends Error & { message: string; code?: number }>(err: T | string): void {

  if (typeof err === 'string') {
    return reportException({ message: err, code: GENERIC_FAILURE, stack: undefined, name: 'UnknownError' })
  }

  const errorMessage = `
An uncaughtException occurred (code: ${err.code || GENERIC_FAILURE}).

Error Data:
${JSON.stringify(err)}

Stacktrace:
${err.stack ? err.stack : '<no stack>'}
  `.trim()

  // eslint-disable-next-line no-console
  console.error(errorMessage)

  // Write error to stderr as well
  process.stderr.write(errorMessage)

  // Exit with non-zero status
  process.exit('code' in err ? err.code : GENERIC_FAILURE)
}
