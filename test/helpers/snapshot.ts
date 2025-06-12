import { describe, expect, it } from '@jest/globals'
import type { Analyzer, ExecutionOptions, Output } from '~src/interface.js'
import { FixtureInput } from './input/FixtureInput.js'

const EMPTY_OPTIONS: ExecutionOptions = {
  debug: false,
  console: false,
  dry: false,
  noTemplates: false,
  pretty: true,
  inputDir: '__',
  output: '__',
  exercise: '__',
}

type AnalyzerFactory = () => Analyzer
type GenerateAllFn = (fixtures: readonly number[]) => void

// eslint-disable-next-line jest/no-export
export function makeTestGenerator(
  slug: string,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  AnalyzerFactory: AnalyzerFactory
): GenerateAllFn {
  function analyze(fixture: number): Promise<Output> {
    const analyzer = AnalyzerFactory()
    const input = new FixtureInput(slug, fixture)

    return analyzer.run(input, EMPTY_OPTIONS)
  }

  return function (fixtures: readonly number[]): void {
    describe(`and expecting`, () => {
      fixtures
        .slice()
        .sort((a, b) => a - b)
        .forEach((fixture) => {
          const identifier = `${slug}/${fixture}`
          it(`matches ${identifier}'s output`, async () => {
            const output = await analyze(fixture)
            expect(output).toMatchSnapshot(`output`)
          })
        })
    })
  }
}
