import { GigasecondAnalyzer } from '~src/analyzers/gigasecond'
import { makeAnalyze } from '~test/helpers/smoke'

const analyze = makeAnalyze(() => new GigasecondAnalyzer())

describe('When running analysis on gigasecond', () => {
  it('can approve as optimal', async () => {

    const solutionContent = `
    const GIGASECOND_IN_MILLIS = 1e9 * 1e3;

    export const gigasecond = (dateOfBirth) => {
      return new Date(dateOfBirth.getTime() + GIGASECOND_IN_MILLIS);
    };
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.status).toBe('approve');
    expect(output.comments.length).toBe(0);
  })

  it('can approve with comment', async () => {

    const solutionContent = `
    export function gigasecond(dateOfBirth) {
      const gigasecondInMillis = Math.pow(10, 9) * 1000;
      return new Date(dateOfBirth.getTime() + gigasecondInMillis)
    }
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.status).toBe('approve');
    expect(output.comments.length).toBe(1);
  })

  it('can disapprove with comment', async () => {

    const solutionContent = `
    export function gigasecond(dateOfBirth) {
      return dateOfBirth.setSeconds(dateOfBirth.getSeconds() + 10 ** 9)
    }
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.status).toBe('disapprove');
    expect(output.comments.length).toBe(1);
  })
})
