import { ExecutionOptions } from "../../src/utils/execution_options";
import { Exercise } from "../../src/exercise";
import { BootstrapResult } from "../../src/utils/bootstrap";
import { setProcessLogger, Logger } from "../../src/utils/logger";

export function bootstrap({ exercise, ...overrides }: { exercise: string } & Partial<ExecutionOptions>): Omit<BootstrapResult, 'input'> {
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

  const logger = setProcessLogger(new Logger(options))

  return {
    options,
    exercise: new Exercise(exercise),
    logger
  }
}
