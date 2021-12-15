import { DirectoryWithConfigInput } from '@exercism/static-analysis'
import path from 'path'
import { ElysesAnalyticEnchantmentsAnalyzer } from '~src/analyzers/concept/elyses-analytic-enchantments'
import { EXEMPLAR_SOLUTION } from '~src/comments/shared'
import { makeAnalyze, makeOptions } from '~test/helpers/smoke'

const inputDir = path.join(
  __dirname,
  '..',
  '..',
  'fixtures',
  'elyses-analytic-enchantments',
  'exemplar'
)

const analyze = makeAnalyze(
  () => new ElysesAnalyticEnchantmentsAnalyzer(),
  makeOptions({
    get inputDir(): string {
      return inputDir
    },
    get exercise(): string {
      return 'elyses-analytic-enchantments'
    },
  })
)

describe('When running analysis on elyses-analytic-enchantments', () => {
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
