import { TwoFerAnalyzer } from '~src/analyzers/practice/two-fer'
import { makeAnalyze } from '~test/helpers/smoke'

const analyze = makeAnalyze(() => new TwoFerAnalyzer())

describe('When running analysis on two-fer', () => {
  it('can approve as optimal', async () => {
    const solutionContent = `
    export const twoFer = (name = 'you') => {
      return \`One for \${name}, one for me.\`;
    };
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.comments.length).toBe(0)
  })

  it('can approve with comment', async () => {
    const solutionContent = `
    const twoFer = (name = 'you') => {
      return \`One for \${name}, one for me.\`;
    };

    export { twoFer }
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.comments.length).toBeGreaterThanOrEqual(1)
    expect(output.comments[0].type).toBe('informative')
  })

  it('can block with a comment', async () => {
    const solutionContent = `
    export const twoFer = (name) => {
      return \`One for \${name || 'you'}, one for me.\`;
    };
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.comments.length).toBeGreaterThanOrEqual(1)
    expect(output.comments[0].type).toBe('actionable')
  })

  it('can ignore solutions', async () => {
    const solutionContent = `
    const whomst = 'for'
    export const twoFer = (name = 'you') => {
      return \`One \${whomst} \${name}, one \${whomst} me.\`;
    };
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.comments.length).toBeGreaterThanOrEqual(1)
  })
})
