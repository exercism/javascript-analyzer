import { TwoFerAnalyzer } from '~src/analyzers/two-fer'
import { InlineInput } from '~test/helpers/input/InlineInput'

async function analyze(solutionContent: string): Promise<Output> {
  const analyzer = new TwoFerAnalyzer()
  const input = new InlineInput([solutionContent])

  return analyzer.run(input)
}

describe('When running analysis on two-fer', () => {
  it('can approve as optimal', async () => {

    const solutionContent = `
    export const twoFer = (name = 'you') => {
      return \`One for \${name}, one for me.\`;
    };
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.status).toBe('approve_as_optimal');
    expect(output.comments.length).toBe(0);
  })

  it('can approve with comment', async () => {

    const solutionContent = `
    const twoFer = (name = 'you') => {
      return \`One for \${name}, one for me.\`;
    };

    export { twoFer }
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.status).toBe('approve_with_comment');
    expect(output.comments.length).toBeGreaterThanOrEqual(1);
  })

  it('can dissapprove with comment', async () => {

    const solutionContent = `
    export const twoFer = (name) => {
      return \`One for \${name || 'you'}, one for me.\`;
    };
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.status).toBe('disapprove_with_comment');
    expect(output.comments.length).toBeGreaterThanOrEqual(1);
  })

  it('can refer to mentor', async () => {

    const solutionContent = `
    const whomst = 'for'
    export const twoFer = (name = 'you') => {
      return \`One \${whomst} \${name}, one \${whomst} me.\`;
    };
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.status).toBe('refer_to_mentor');
  })
})
