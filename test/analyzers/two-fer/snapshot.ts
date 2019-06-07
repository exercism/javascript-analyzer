import { TwoFerAnalyzer } from '~src/analyzers/two-fer'
import { FixtureInput } from '~test/helpers/input/FixtureInput'

async function analyze(number: number): Promise<Output> {
  const analyzer = new TwoFerAnalyzer()
  const input = new FixtureInput('two-fer', number)

  return analyzer.run(input)
}

describe('When running analysis on two-fer', () => {
  it('can approve as optimal', async () => {
    await Promise.all(
      [118, 129, 139, 313, 400, 493, 70].map(async (fixture) => {
        const output = await analyze(fixture)
        expect(output.status).toBe('approve_as_optimal');
        expect(output).toMatchSnapshot(`two-fer/${fixture} should be approve_as_optimal`)
      })
    )
  })

  it('can disapprove with comment', async () => {
    await Promise.all(
      [
        1, 10, 100, 101, 102, 104, 105, 107, 109, 11,
        110, 111, 112, 114, 115, 116, 12, 121, 123, 124
      ].map(async (fixture) => {
        const output = await analyze(fixture)
        expect(output.status).toBe('disapprove_with_comment');
        expect(output).toMatchSnapshot(`two-fer/${fixture} should be disapprove_with_comment`)
      })
    )
  })

  it('can refer to mentor', async () => {
    await Promise.all(
      [
        0, 103, 106, 108, 113, 119, 120, 122, 133, 138,
        143, 147, 148, 166, 171, 175, 181, 183, 192, 194
      ].map(async (fixture) => {
        const output = await analyze(fixture)
        expect(output.status).toBe('refer_to_mentor');
        expect(output).toMatchSnapshot(`two-fer/${fixture} should be refer_to_mentor`)
      })
    )
  })
})
