import type { Logger, LoggerInput } from '@exercism/static-analysis'
import { setProcessLogger } from '@exercism/static-analysis'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import type { ExecutionOptions } from '~src/interface.d.js'
import { LogOutput } from '~src/output/processor/LogOutput.js'

const CONTENTS = `My Fine Output`

const TEST_LOGGER: Logger & {
  log: jest.Mock<(this: LoggerInput, buffer: LoggerInput) => void>
} = {
  error: jest.fn<(this: LoggerInput, buffer: LoggerInput) => void>(),
  log: jest.fn<(this: LoggerInput, buffer: LoggerInput) => void>(),
  fatal:
    jest.fn<
      (
        this: LoggerInput,
        buffer: LoggerInput,
        status: number | undefined
      ) => never
    >(),
}

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
