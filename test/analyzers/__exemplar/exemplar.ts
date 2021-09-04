import { DirectoryWithConfigInput } from '@exercism/static-analysis'
import path from 'path'
import { ExemplarAnalyzer } from '~src/analyzers/concept/__exemplar'
import { EXEMPLAR_SOLUTION } from '~src/comments/shared'
import { makeAnalyze, makeOptions } from '~test/helpers/smoke'
;[
  'amusement-park',
  'bird-watcher',
  'coordinate-transformation',
  'elyses-analytic-enchantments',
  'elyses-destructured-enchantments',
  'elyses-enchantments',
  'elyses-looping-enchantments',
  'elyses-transformative-enchantments',
  'factory-sensors',
  // 'fruit-picker',
  'high-score-board',
  'lasagna-master',
  'lucky-numbers',
  'mixed-juices',
  'nullability',
  'ozans-playlist',
  'pizza-order',
  'translation-service',
  'vehicle-purchase',
].forEach((exercise) => {
  const inputDir = path.join(
    __dirname,
    '..',
    '..',
    'fixtures',
    exercise,
    'exemplar'
  )

  const analyze = makeAnalyze(
    () => new ExemplarAnalyzer(),
    makeOptions({
      get inputDir(): string {
        return inputDir
      },
      get exercise(): string {
        return exercise
      },
    })
  )

  describe(`When running analysis on ${exercise}`, () => {
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
})
