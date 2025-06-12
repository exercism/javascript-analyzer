import { describe, expect, it } from '@jest/globals'
import { TwoFerAnalyzer } from '~src/analyzers/practice/two-fer/index.js'
import { makeAnalyze } from '~test/helpers/smoke.js'

const analyze = makeAnalyze(() => new TwoFerAnalyzer())

describe('When running analysis on two-fer', () => {
  it('does not generate actionable comments when using coalesce', async () => {
    const solutionContent = `
    export const twoFer = (name) => {
      return \`One for \${name ?? 'you'}, one for me.\`
    }
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.comments.length).toBe(0)
  })
})
