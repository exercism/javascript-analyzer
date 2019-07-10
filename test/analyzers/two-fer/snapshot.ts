import { TwoFerAnalyzer } from '~src/analyzers/two-fer'
import { makeTestGenerator } from '~test/helpers/snapshot'

const snapshotTestsGenerator = makeTestGenerator(
  'two-fer',
  () => new TwoFerAnalyzer()
)

describe('When running analysis on two-fer fixtures', () => {
  snapshotTestsGenerator('approve', [
    129, 139, 400, 493, 70
  ])
  snapshotTestsGenerator('disapprove', [
    1, 10, 100, 101, 102, 104, 105, 107, 109, 11,
    110, 111, 112, 114, 115, 116, 12, 121, 123, 124,
    118, 120, 313
  ])
  snapshotTestsGenerator('refer_to_mentor', [
    0, 103, 106, 108, 113, 119, 122, 133, 138,
    143, 147, 148, 166, 171, 175, 181, 183, 192, 194
  ])
})
