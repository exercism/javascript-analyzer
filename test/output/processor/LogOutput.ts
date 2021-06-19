import { LogOutput } from '~src/output/processor/LogOutput'
import type { ExecutionOptions } from '~src/interface'
import type { Logger, LoggerInput } from '@exercism/static-analysis'
import { setProcessLogger } from '@exercism/static-analysis'

const CONTENTS = `My Fine Output`

/* eslint-disable @typescript-eslint/no-invalid-void-type */
const TEST_LOGGER: Logger & { log: jest.MockInstance<void, [LoggerInput]> } = {
  error: jest.fn<void, [LoggerInput]>(),
  log: jest.fn<void, [LoggerInput]>(),
  fatal: jest.fn<never, [LoggerInput, number | undefined]>(),
}
/* eslint-enable @typescript-eslint/no-invalid-void-type */

const DEFAULT_OPTIONS: ExecutionOptions = {
  debug: false,
  dry: false,
  console: true,
  noTemplates: false,
  pretty: false,
  exercise: '<no-exercise>',
  output: '<no-output>',
  inputDir: '<no-input>',
}

describe('LogOutput', () => {
  beforeEach(() => {
    TEST_LOGGER.log.mockClear()
    setProcessLogger(TEST_LOGGER)
  })

  it('logs the output', async () => {
    await LogOutput(Promise.resolve(CONTENTS), DEFAULT_OPTIONS)
    expect(TEST_LOGGER.log).toHaveBeenCalled()
    expect(
      TEST_LOGGER.log.mock.calls.find((l) =>
        l.find((arg) => arg.toString().includes(CONTENTS))
      )
    ).toBeDefined()
  })

  it("doesn't modify the output", async () => {
    const result = await LogOutput(Promise.resolve(CONTENTS), DEFAULT_OPTIONS)
    expect(result).toBe(CONTENTS)
  })
})
