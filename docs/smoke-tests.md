# Smoke Tests

When you're writing a _new analyzer_ it is very important that you add 🌫 smoke
tests. In general these will `execute` the analyzer without a `Runner` or any
other moving parts. This heuristic is great at detecting 🔥 fires, thereby `
ensuring that when an internal is changed, nothing breaks.

## Contents

Add a new file `test/analyzers/<slug>/smoke.ts` and copy the following template,
replacing `<slug>` with the actual slug.

```typescript
import { SlugAnalyzer } from '~src/analyzers/<slug>'
import { makeAnalyze } from '~test/helpers/smoke'

const analyze = makeAnalyze(() => new SlugAnalyzer())

describe('When running analysis on <slug>', () => {
  it('can approve as optimal', async () => {

    const solutionContent = `
    // add a code example that SHOULD be approved as optimal
    `.trim()

    const output = await analyze(solutionContent)

    expect(output.status).toBe('approve');
    expect(output.comments.length).toBe(0);
  })
})
```

Add additional test cases for `approve` and `disapprove`, if your analyzer can
actually output those. If you have explicit code that should always return
`refer_to_mentor`, add it too.

**Note**: This is not the place to add an exhaustive test of inputs to outputs.
It's merely trying to detect when one of the known cases changes!
