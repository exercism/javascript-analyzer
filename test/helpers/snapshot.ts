import { FixtureInput } from "~test/helpers/input/FixtureInput";

type AnalyzerFactory = () => Analyzer
type generateAll = (status: Output['status'], fixtures: readonly number[]) => void

export function makeTestGenerator(slug: string, AnalyzerFactory: AnalyzerFactory): generateAll {
  function analyze(fixture: number): Promise<Output> {
    const analyzer = AnalyzerFactory()
    const input = new FixtureInput(slug, fixture)

    return analyzer.run(input)
  }

  return async function (status: Output['status'], fixtures: readonly number[]) {
    describe(`and expecting it to ${status.replace(/_/g, ' ')}`, () => {
      fixtures.slice().sort().forEach((fixture) => {
        const identifier = `${slug}/${fixture}`
        it(`matches ${identifier}'s output`, async () => {
          const output = await analyze(fixture)
          expect(output.status).toBe(status);
          expect(output).toMatchSnapshot(`output`)
        })
      })
    })
  }
}
