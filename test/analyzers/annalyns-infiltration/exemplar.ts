import { DirectoryWithConfigInput } from '@exercism/static-analysis'
import path from 'path'
import { AnnalynsInfiltrationAnalyzer } from '~src/analyzers/concept/annalyns-infiltration'
import { EXEMPLAR_SOLUTION } from '~src/comments/shared'
import { makeAnalyze, makeOptions } from '~test/helpers/smoke'

const inputDir = path.join(
  __dirname,
  '..',
  '..',
  'fixtures',
  'annalyns-infiltration',
  'exemplar'
)

const analyze = makeAnalyze(
  () => new AnnalynsInfiltrationAnalyzer(),
  makeOptions({
    get inputDir(): string {
      return inputDir
    },
    get exercise(): string {
      return 'annalyns-infiltration'
    },
  })
)

describe('When running analysis on annalyns-infiltration', () => {
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
