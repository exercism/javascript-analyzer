# Snapshot Tests

When maintaining an `analyzer`, you can use the `batch` binary in order to run
the analyzer on all the fixtures we have.

```bash
bin/batch.sh two-fer
```

The above command generates `analysis.json` for all the `two-fer` fixtures, as
located in `test/fixtures/two-fer/`. You can use these outputs to see if your
analyzer produces the right result.

Once you have established which solutions should generate a result and with what
commentary, it might be a good time to set up a 📸 _snapshot_ test. These will
record a snapshot of output and make sure they are the same, every single time.

## Contents

Add a new file `test/analyzers/<slug>/snapshot.ts` and copy the following
template, replacing `<slug>` with the actual slug and entering **1 to 20** (more
is better, but too many is not good) fixture numbers to be tested.

```typescript
import { SlugAnalyzer } from '~src/analyzers/<type>/<slug>'
import { makeTestGenerator } from '~test/helpers/snapshot'

const snapshotTestsGenerator = makeTestGenerator(
  '<slug>',
  () => new SlugAnalyzer()
)

describe('When running analysis on two-fer fixtures', () => {
  snapshotTestsGenerator([
    // <fixture numbers>
  ])
})
```

**Note**: This is not the place to add an exhaustive test of inputs to outputs.
It's merely trying to detect when one of the known cases changes!

## Initial run

After you've added this test file, run the test suite (`yarn test`). It will
generate a snapshot file. The `snapshotTestsGenerator` also validates the output
status, just in case you entered the fixture number in the wrong category.

## Verification and updating

If one of fixtures' output changes, the test suite will fail.

1. Go through each failure manually and validate that it's as expected
1. Run `yarn test -u` to update the snapshots
1. Commit the changed snapshot file (at `test/analyzers/<slug>/__snapshots__/`)
