import { ResistorColorAnalyzer } from '~src/analyzers/practice/resistor-color'
import { makeTestGenerator } from '~test/helpers/snapshot'

const snapshotTestsGenerator = makeTestGenerator(
  'resistor-color',
  () => new ResistorColorAnalyzer()
)

describe('When running analysis on resistor-color fixtures', () => {
  snapshotTestsGenerator([
    0, 1, 100, 101, 102, 105, 106, 107, 110, 113, 115, 117, 12, 122, 123, 127,
    13, 131, 132, 134, 135, 137, 138, 14, 142, 149, 150, 151, 158, 16, 161, 163,
    164, 165, 168, 17, 171, 172, 173, 174, 175, 179, 18, 180, 182, 184, 186,
    187, 189, 191, 192, 196, 197, 199, 2, 20, 206, 209, 211, 212,
  ])
})
