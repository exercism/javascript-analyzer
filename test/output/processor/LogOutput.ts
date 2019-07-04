import { LogOutput } from '~src/output/processor/LogOutput'
import { setProcessLogger, Logger, LoggerInput } from '~src/utils/logger'

const CONTENTS = `My Fine Output`

const TEST_LOGGER: Logger & { log: jest.MockInstance<void, [LoggerInput]> } = {
  error: jest.fn<void, [LoggerInput]>(),
  log: jest.fn<void, [LoggerInput]>(),
  fatal: jest.fn<never, [LoggerInput, number | undefined]>()
}

const DEFAULT_OPTIONS: ExecutionOptions = {
  debug: false,
  dry: false,
  console: true,
  noTemplates: false,
  pretty: false,
  exercise: '<no-exercise>',
  output: '<no-output>',
  inputDir: '<no-input>'
}

describe('LogOutput', () => {

  beforeEach(() => {
    TEST_LOGGER.log.mockClear()
    setProcessLogger(TEST_LOGGER)
  })

  it('logs the output', async () => {
    await LogOutput(Promise.resolve(CONTENTS), DEFAULT_OPTIONS)
    expect(TEST_LOGGER.log).toHaveBeenCalled()
    expect(TEST_LOGGER.log.mock.calls.find(l => l.find(arg => arg.toString().includes(CONTENTS)))).toBeDefined()
  })

  it('doesn\'t modify the output', async () => {
    const result = await LogOutput(Promise.resolve(CONTENTS), DEFAULT_OPTIONS)
    expect(result).toBe(CONTENTS)
  })
})
