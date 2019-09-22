type StreamBuffer = string | Buffer | Uint8Array
export type LoggerInput = StreamBuffer | (() => StreamBuffer)

/**
 * Log the buffer to the output
 * @param buffer
 */
function log(buffer: LoggerInput): void {
  process.stdout.write(buffer instanceof Function ? buffer() : buffer)
}

/**
 * Log the buffer to the error output
 * @param buffer
 */
function error(buffer: LoggerInput): void {
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

function noop(_: LoggerInput): void {
  /* noop */
}

export interface Logger {
  error: typeof error;
  fatal: typeof fatal;
  log: typeof log;
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

const NOOP_LOGGER = new Logger({ debug: false, console: false })
const LIVE_BINDING: { current: Logger | null } = { current: NOOP_LOGGER }

/**
 * Set the 'global' logger
 * @param logger
 * @returns the global logger
 */
export function setProcessLogger(logger: Readonly<Logger>): Readonly<Logger> {
  return LIVE_BINDING.current = logger
}

/**
 * Get the 'global' logger
 */
export function getProcessLogger(): Logger {
  return LIVE_BINDING.current || NOOP_LOGGER
}
