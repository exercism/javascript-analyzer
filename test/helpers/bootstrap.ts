import { ExecutionOptions } from "../../src/utils/execution_options";
import { Exercise } from "../../src/exercise";
import { set as setGlobalLogger, Logger } from "../../src/utils/logger";
import { BootstrapResult } from "../../dist/utils/bootstrap";

export function bootstrap({ exercise, ...overrides }: { exercise: string } & Partial<ExecutionOptions>): Omit<BootstrapResult, 'solution'> {
  const options = new ExecutionOptions({
    debug: false,
    console: false,
    output: '__fake__',
    inputDir: '__fake__',
    dry: true,
    templates: true,
    exercise,
    ...overrides
  })

  const logger = setGlobalLogger(new Logger(options))

  return {
    options,
    exercise: new Exercise(exercise),
    logger
  }
}
