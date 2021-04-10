import { DirectoryWithConfigInput } from '@exercism/static-analysis'
import path from 'path'
import { FreelancerRatesAnalyzer } from '~src/analyzers/concept/freelancer-rates'
import { EXEMPLAR_SOLUTION } from '~src/comments/shared'
import { makeAnalyze, makeOptions } from '~test/helpers/smoke'

const inputDir = path.join(
  __dirname,
  '..',
  '..',
  'fixtures',
  'freelancer-rates',
  'exemplar'
)

const analyze = makeAnalyze(
  () => new FreelancerRatesAnalyzer(),
  makeOptions({
    get inputDir(): string {
      return inputDir
    },
    get exercise(): string {
      return 'freelancer-rates'
    },
  })
)

describe('When running analysis on freelancer-rates', () => {
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
