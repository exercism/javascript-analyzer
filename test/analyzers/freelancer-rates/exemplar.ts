import { describe, it, expect } from '@jest/globals'
import { DirectoryWithConfigInput } from '@exercism/static-analysis'
import path from 'node:path'
import { FreelancerRatesAnalyzer } from '~src/analyzers/concept/freelancer-rates/index.js'
import { EXEMPLAR_SOLUTION } from '~src/comments/shared.js'
import { makeAnalyze, makeOptions } from '~test/helpers/smoke.js'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = import.meta.dirname

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
  it('recognizes the exemplar solution', async () => {
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
