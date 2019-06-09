import { LogOutput } from '~src/output/processor/LogOutput'
import { setProcessLogger, Logger, LoggerInput } from '~src/utils/logger'

const CONTENTS = `My Fine Output`

const TEST_LOGGER: Logger & { log: jest.MockInstance<void, [LoggerInput]> } = {
  error: jest.fn<void, [LoggerInput]>(),
  log: jest.fn<void, [LoggerInput]>(),
  fatal: jest.fn<never, [LoggerInput, number | undefined]>()
}

describe('LogOutput', () => {

  beforeEach(() => {
    TEST_LOGGER.log.mockClear()
    setProcessLogger(TEST_LOGGER)
  })

  it('logs the output', async () => {
    await LogOutput(Promise.resolve(CONTENTS), {} as ExecutionOptions)
    expect(TEST_LOGGER.log).toBeCalled()
    expect(TEST_LOGGER.log.mock.calls.find(l => l.find(arg => arg.toString().includes(CONTENTS)))).toBeDefined()
  })

  it('doesn\'t modify the output', async () => {
    const result = await LogOutput(Promise.resolve(CONTENTS), {} as ExecutionOptions)
    expect(result).toBe(CONTENTS)
  })
})
