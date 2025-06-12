import { Logger, setProcessLogger } from '@exercism/static-analysis'
import { ExerciseImpl } from '~src/ExerciseImpl.js'
import type { ExecutionOptions } from '~src/interface.d.js'
import type { BootstrapResult } from '~src/utils/bootstrap.js'
import { ExecutionOptionsImpl } from '~src/utils/execution_options.js'

export function bootstrap({
  exercise,
  ...overrides
}: { exercise: string } & Partial<ExecutionOptions>): Omit<
  BootstrapResult,
  'input'
> {
  const options = new ExecutionOptionsImpl({
    debug: false,
    console: false,
    output: '__fake__',
    inputDir: '__fake__',
    dry: true,
    noTemplates: false,
    pretty: false,
    exercise,
    ...overrides,
  })

  const logger = setProcessLogger(new Logger(options))

  return {
    options,
    exercise: new ExerciseImpl(exercise),
    logger,
  }
}
