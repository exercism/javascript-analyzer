import { DirectoryWithConfigInput } from '@exercism/static-analysis'
import path from 'path'
import {
  LasagnaAnalyzer,
  MUST_CALL_PREPARATION_TIME_IN_MINUTES,
} from '~src/analyzers/concept/lasagna'
import {
  EXEMPLAR_SOLUTION,
  REPLACE_MAGIC_WITH_IDENTIFIER,
} from '~src/comments/shared'
import { makeAnalyze, makeOptions } from '~test/helpers/smoke'

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

describe(
  ['When analyzing fixtures', 'lasagna', 'not-using-earlier-function'].join(
    '/'
  ),
  () => {
    it('recognises not using the earlier function', async () => {
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
  }
)
