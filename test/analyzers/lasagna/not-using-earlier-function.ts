import { describe, it, expect } from '@jest/globals'
import { DirectoryWithConfigInput } from '@exercism/static-analysis'
import path from 'node:path'
import {
  LasagnaAnalyzer,
  MUST_CALL_PREPARATION_TIME_IN_MINUTES,
} from '~src/analyzers/concept/lasagna/index.js'
import { makeAnalyze, makeOptions } from '~test/helpers/smoke.js'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = import.meta.dirname

const inputDir = path.join(
  __dirname,
  '..',
  '..',
  'fixtures',
  'lasagna',
  'not-using-earlier-function'
)

const analyze = makeAnalyze(
  () => new LasagnaAnalyzer(),
  makeOptions({
    get inputDir(): string {
      return inputDir
    },
    get exercise(): string {
      return 'lasagna'
    },
  })
)

describe('When analyzing fixtures/lasagna/not-using-earlier-function', () => {
  it('recognizes not using the earlier function', async () => {
    const input = new DirectoryWithConfigInput(inputDir)

    const [solution] = await input.read()
    const output = await analyze(solution)

    expect(output.comments.length).toBeGreaterThanOrEqual(1)
    const comment = output.comments.find(
      (comment) =>
        comment.externalTemplate ===
        MUST_CALL_PREPARATION_TIME_IN_MINUTES().externalTemplate
    )
    expect(comment).not.toBeUndefined()
  })
})
