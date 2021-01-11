import { ResistorColorAnalyzer } from '~src/analyzers/resistor-color'
import { makeAnalyze } from '~test/helpers/smoke'

const analyze = makeAnalyze(() => new ResistorColorAnalyzer())

describe('When running analysis on resistor-color', () => {
  it('can approve as optimal', async () => {
    const solutionContent = `
    export const COLORS = [
      "black", "brown", "red", "orange", "yellow",
      "green", "blue", "violet", "grey", "white"
    ]
    export function colorCode(color) {
      return COLORS.indexOf(color)
    }

    `.trim()

    const output = await analyze(solutionContent)

    expect(output.status).toBe('approve')
    expect(output.comments.length).toBe(0)
  })
})
