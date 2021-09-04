import { TwoFerAnalyzer } from '~src/analyzers/practice/two-fer'
import { run } from '~src/utils/runner'
import { find } from '~src/analyzers/Autoload'

import { bootstrap } from '~test/helpers/bootstrap'
import { InlineInput } from '@exercism/static-analysis'

const { options, exercise } = bootstrap({ exercise: 'two-fer' })

describe('When running analysis', () => {
  it('can approve as optimal', async () => {
    const solutionContent = `
    export const twoFer = (name = 'you') => {
      return \`One for \${name}, one for me.\`;
    };
    `.trim()

    const analyzer = new TwoFerAnalyzer()
    const input = new InlineInput([solutionContent])
    const output = await run(analyzer, input, options)

    expect(output.comments).toHaveLength(0)
  })

  it('can approve with comment', async () => {
    const solutionContent = `
    const twoFer = (name = 'you') => {
      return \`One for \${name}, one for me.\`;
    };

    export { twoFer }
    `.trim()

    const analyzer = new TwoFerAnalyzer()
    const input = new InlineInput([solutionContent])
    const output = await run(analyzer, input, options)

    expect(output.comments.length).toBeGreaterThanOrEqual(1)
    expect(output.comments[0].type).toBe('informative')
  })

  it('can dissapprove with comment', async () => {
    const solutionContent = `
    export const twoFer = (name) => {
      return \`One for \${name || 'you'}, one for me.\`;
    };
    `.trim()

    const analyzer = new TwoFerAnalyzer()
    const input = new InlineInput([solutionContent])
    const output = await run(analyzer, input, options)

    expect(output.comments.length).toBeGreaterThanOrEqual(1)
    expect(output.comments[0].type).toBe('actionable')
  })
})

describe('When autoloading analyzers', () => {
  it('can find an analyzer based on an exercise', () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const ActualAnalyzer = find(exercise)
    expect(ActualAnalyzer).toBe(TwoFerAnalyzer)
  })
})
