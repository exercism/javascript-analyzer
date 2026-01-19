import { TwoFerAnalyzer } from '~src/analyzers/practice/two-fer'
import { makeAnalyze } from '~test/helpers/smoke'

const analyze = makeAnalyze(() => new TwoFerAnalyzer())

describe('two-fer stub throw detection', () => {
  it('blocks canonical exercism stub throw', async () => {
    const solution = `
      export function twoFer(name = 'you') {
        return 'One for you, one for me.'
        throw new Error('Remove this line and implement the function');
      }
    `.trim()

    const output = await analyze(solution)

    const stub = output.comments.find(
      (c) => c.externalTemplate === 'javascript.general.remove_stub_throw'
    )

    expect(stub).toBeDefined()
    expect(stub?.type).toBe('essential')
  })

  it('does not block normal error throws', async () => {
    const solution = `
      export function twoFer(name = 'you') {
        if (name === 'bad') {
          throw new Error('Invalid name');
        }
        return \`One for \${name}, one for me.\`
      }
    `.trim()

    const output = await analyze(solution)

    const stub = output.comments.find(
      (c) => c.externalTemplate === 'javascript.general.remove_stub_throw'
    )

    expect(stub).toBeUndefined()
  })
})
