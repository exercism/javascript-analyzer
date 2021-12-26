import { DirectoryWithConfigInput } from '@exercism/static-analysis'
import path from 'path'
import { VehiclePurchaseAnalyzer } from '~src/analyzers/concept/vehicle-purchase'
import { EXEMPLAR_SOLUTION } from '~src/comments/shared'
import { makeAnalyze, makeOptions } from '~test/helpers/smoke'

const inputDir = path.join(
  __dirname,
  '..',
  '..',
  'fixtures',
  'vehicle-purchase',
  'exemplar'
)

const analyze = makeAnalyze(
  () => new VehiclePurchaseAnalyzer(),
  makeOptions({
    get inputDir(): string {
      return inputDir
    },
    get exercise(): string {
      return 'vehicle-purchase'
    },
  })
)

describe('When running analysis on vehicle-purchase', () => {
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
