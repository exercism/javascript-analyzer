import { TwoFerAnalyzer } from '~src/analyzers/practice/two-fer'
import { makeAnalyze } from '~test/helpers/smoke'

const analyze = makeAnalyze(() => new TwoFerAnalyzer())

describe('When running analysis on two-fer', () => {
  it('disapproves an incorrect solution without an explicit return', async () => {
    const solutionContent = `
    export const twoFer = (name = 'you') => {
      console.log(\`One for \${name}, one for me.\`)
    }
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.comments.length).toBeGreaterThan(1)
    expect(output.comments[0].type).not.toBe('celebratory')
  })

  it('disapproves an incorrect solution without a return value', async () => {
    const solutionContent = `
    export const twoFer = (name = 'you') => console.log(\`One for \${name}, one for me.\`)
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.comments.length).toBeGreaterThan(1)
    expect(output.comments[0].type).not.toBe('celebratory')
  })
})
