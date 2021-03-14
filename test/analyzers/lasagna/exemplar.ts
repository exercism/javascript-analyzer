import path from 'path'
import { LasagnaAnalyzer } from '~src/analyzers/concept/lasagna'
import { EXEMPLAR_SOLUTION } from '~src/comments/shared'
import { DirectoryWithConfigInput } from '~src/input/DirectoryWithConfigInput'
import { makeAnalyze, makeOptions } from '~test/helpers/smoke'

const inputDir = path.join(
  __dirname,
  '..',
  '..',
  'fixtures',
  'lasagna',
  'exemplar'
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

describe('When running analysis on lasagna', () => {
  it('recognises the exemplar solution', async () => {
    const input = new DirectoryWithConfigInput(inputDir)

    const [solution] = await input.read()
    const output = await analyze(solution)

    expect(output.comments.length).toBe(1)
    expect(output.comments[0].type).toBe('celebratory')
    expect(output.comments[0].externalTemplate).toBe(
      EXEMPLAR_SOLUTION().externalTemplate
    )
  })
})
