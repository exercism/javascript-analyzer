import { ExecutionOptionsImpl } from '~src/utils/execution_options'
import { ExerciseImpl } from '~src/ExerciseImpl'
import { BootstrapResult } from '~src/utils/bootstrap'
import { ExecutionOptions } from '~src/interface'
import { Logger, setProcessLogger } from '@exercism/static-analysis'

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
