import { GENERIC_FAILURE } from "./codes";

export function registerExceptionHandler(): void {
  process.on('uncaughtException', reportException)
}

export function reportException<T extends Error & { message: string; code?: number }>(err: T): never
export function reportException<T extends Error & { message: string; code?: number }>(err: T | string): never {

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

  if (typeof process !== 'undefined') {
    // Write error to stderr as well
    process.stderr && process.stderr.write(errorMessage)
  }

  if (process.exit) {
    // Exit with non-zero status
    process.exit('code' in err ? err.code : GENERIC_FAILURE)
  }

  throw err
}
