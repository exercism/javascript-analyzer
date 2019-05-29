import { Runner } from '../src/runner'
import { Analyzers } from '../src/analyzers'
import { TwoFerAnalyzer } from '../src/analyzers/two-fer'
import { InlineSolution } from './helpers/inline-solution'
import { bootstrap } from './helpers/bootstrap'

const { options, exercise } = bootstrap({ exercise: 'two-fer' })


describe('When running analysis', () => {
  it('can approve as optimal', async () => {

    const solutionContent = `
    export const twoFer = (name = 'you') => {
      return \`One for \${name}, one for me.\`;
    };
    `.trim()

    const solution = new InlineSolution([solutionContent], exercise)
    const analyzer = new TwoFerAnalyzer(solution)

    const output = await Runner.call(analyzer, options);
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

    const solution = new InlineSolution([solutionContent], exercise)
    const analyzer = new TwoFerAnalyzer(solution)

    const output = await Runner.call(analyzer, options);
    expect(output.status).toBe('approve_with_comment');
    expect(output.comments.length).toBeGreaterThanOrEqual(1);
  })

  it('can dissapprove with comment', async () => {

    const solutionContent = `
    export const twoFer = (name) => {
      return \`One for \${name || 'you'}, one for me.\`;
    };
    `.trim()

    const solution = new InlineSolution([solutionContent], exercise)
    const analyzer = new TwoFerAnalyzer(solution)

    const output = await Runner.call(analyzer, options);
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

    const solution = new InlineSolution([solutionContent], exercise)
    const analyzer = new TwoFerAnalyzer(solution)

    const output = await Runner.call(analyzer, options);
    expect(output.status).toBe('refer_to_mentor');
  })
})

describe('When autoloading analyzers', () => {
  it('can find an analyzer based on an exercise', () => {
    const ActualAnalyzer = Analyzers.find(exercise)
    expect(ActualAnalyzer).toBe(TwoFerAnalyzer)
  })
})
