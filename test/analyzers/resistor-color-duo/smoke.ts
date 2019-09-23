import { ResistorColorDuoAnalyzer } from '~src/analyzers/resistor-color-duo'
import { makeAnalyze } from '~test/helpers/smoke'

const analyze = makeAnalyze(() => new ResistorColorDuoAnalyzer())

describe('When running analysis on resistor-color-duo', () => {
  it('can approve as optimal', async () => {

    const solutionContent = `
    const COLORS = [
      "black",
      "brown",
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "violet",
      "grey",
      "white"
    ]

    function colorCode(color) {
      return COLORS.indexOf(color)
    }

    export function value([tens, ones]) {
      return colorCode(tens) * 10 + colorCode(ones)
    }
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.status).toBe('approve');
    expect(output.comments.length).toBe(0);
  })
})
