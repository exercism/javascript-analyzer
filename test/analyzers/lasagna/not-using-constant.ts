import { describe, it, expect } from '@jest/globals'
import { DirectoryWithConfigInput } from '@exercism/static-analysis'
import path from 'node:path'
import { LasagnaAnalyzer } from '~src/analyzers/concept/lasagna/index.js'
import { REPLACE_MAGIC_WITH_IDENTIFIER } from '~src/comments/shared.js'
import { makeAnalyze, makeOptions } from '~test/helpers/smoke.js'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = import.meta.dirname

const inputDir = path.join(
  __dirname,
  '..',
  '..',
  'fixtures',
  'lasagna',
  'not-using-constant'
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

describe('When analyzing fixtures/lasagna/not-using-constant', () => {
  it('recognizes not using the predefined constant', async () => {
    const input = new DirectoryWithConfigInput(inputDir)

    const [solution] = await input.read()
    const output = await analyze(solution)

    expect(output.comments.length).toBeGreaterThanOrEqual(1)
    const comment = output.comments.find(
      (comment) =>
        comment.externalTemplate ===
        REPLACE_MAGIC_WITH_IDENTIFIER().externalTemplate
    )
    expect(comment).not.toBeUndefined()
  })
})
