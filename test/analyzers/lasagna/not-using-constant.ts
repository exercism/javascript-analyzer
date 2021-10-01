import { DirectoryWithConfigInput } from '@exercism/static-analysis'
import path from 'path'
import { LasagnaAnalyzer } from '~src/analyzers/concept/lasagna'
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

describe(
  ['When analyzing fixtures', 'lasagna', 'not-using-constant'].join('/'),
  () => {
    it('recognises not using the predefined constant', async () => {
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
  }
)
