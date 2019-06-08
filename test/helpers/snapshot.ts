import { FixtureInput } from "~test/helpers/input/FixtureInput";

type AnalyzerFactory = () => Analyzer
type generateAll = (status: Output['status'], fixtures: readonly number[]) => void

export function makeTestGenerator(slug: string, AnalyzerFactory: AnalyzerFactory): generateAll {
  function analyze(fixture: number) {
    const analyzer = AnalyzerFactory()
    const input = new FixtureInput(slug, fixture)

    return analyzer.run(input)
  }

  return async function (status: Output['status'], fixtures: readonly number[]) {
    it(`can ${status.replace(/_/g, ' ')}`, async () => {
      await Promise.all(
        fixtures.map(async (fixture) => {
          const output = await analyze(fixture)
          expect(output.status).toBe(status);
          expect(output).toMatchSnapshot(`${slug}/${fixture} output`)
        })
      )
    })
  }
}
