import { DirectoryWithConfigInput } from '@exercism/static-analysis'
import path from 'path'
import { BirdWatcherAnalyzer } from '~src/analyzers/concept/bird-watcher'
import { EXEMPLAR_SOLUTION } from '~src/comments/shared'
import { makeAnalyze, makeOptions } from '~test/helpers/smoke'

const inputDir = path.join(
  __dirname,
  '..',
  '..',
  'fixtures',
  'bird-watcher',
  'exemplar'
)

const analyze = makeAnalyze(
  () => new BirdWatcherAnalyzer(),
  makeOptions({
    get inputDir(): string {
      return inputDir
    },
    get exercise(): string {
      return 'bird-watcher'
    },
  })
)

describe('When running analysis on bird-watcher', () => {
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
