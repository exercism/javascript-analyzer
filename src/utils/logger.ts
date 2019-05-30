import { ExecutionOptions } from './execution_options'

type StreamBuffer = string | Buffer | Uint8Array
type LoggerInput = StreamBuffer | (() => StreamBuffer)

/**
 * Log the buffer to the output
 * @param buffer
 */
function log(buffer: LoggerInput) {
  process.stdout.write(buffer instanceof Function ? buffer() : buffer)
}

/**
 * Log the buffer to the error output
 * @param buffer
 */
function error(buffer: LoggerInput) {
  process.stderr.write(buffer instanceof Function ? buffer() : buffer)
}

/**
 * Log the buffer to the error ouput and exist the current process
 * @param buffer
 * @param status
 */
function fatal(this: Logger, buffer: LoggerInput, status = 1): never {
  this.error(buffer)
  return process.exit(status)
}

function noop(_: LoggerInput) {}

const LIVE_BINDING: { current: Logger | null } = { current: null }

/**
 * Set the 'global' logger
 * @param logger
 * @returns the global logger
 */
export function setProcessLogger(logger: Readonly<Logger>) {
  return LIVE_BINDING.current = logger
}

/**
 * Get the 'global' logger
 */
export function getProcessLogger(): Logger {
  return LIVE_BINDING.current!
}

export interface Logger {
  error: typeof error
  fatal: typeof fatal
  log: typeof log
}

export class Logger {
  constructor({ debug, console }: Pick<ExecutionOptions, 'debug' | 'console'>) {
    return Object.freeze({
      fatal,

      error: console ? global.console.error : error,
      log: debug ? (console ? global.console.log : log) : noop,
    })
  }
}
