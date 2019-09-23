import { ResistorColorDuoAnalyzer } from '~src/analyzers/resistor-color-duo'
import { makeTestGenerator } from '~test/helpers/snapshot'

const snapshotTestsGenerator = makeTestGenerator(
  'resistor-color-duo', () => new ResistorColorDuoAnalyzer()
)

describe('When running analysis on resistor-color-duo fixtures', () => {
  snapshotTestsGenerator('approve', [
    /* eslint-disable @typescript-eslint/indent */
      0, 102, 121, 128, 145,  15, 160, 170, 229, 311,
     32
    /* eslint-enable @typescript-eslint/indent */
  ])
  snapshotTestsGenerator('disapprove', [
    /* eslint-disable @typescript-eslint/indent */
      1,  10, 100, 103, 104, 105, 106, 107, 108,  11,
    110, 111, 112, 114, 115, 116, 117, 118, 119,  12,
    120, 123, 124, 125, 126, 127,  13, 130, 134, 135,
    136, 141, 142, 143, 144, 146, 147, 150, 152, 153,
    154, 155, 156, 159, 161, 164, 165, 166, 168,  17,
    172, 174, 175, 177, 178,  18, 181, 183, 185, 186,
    187,  19, 190, 191, 192, 193, 194, 195, 197, 199,
      2,  20, 200, 201, 202, 203, 204, 205, 206, 207,
    208, 211, 215, 218,  22, 220, 221, 222, 223, 224,
    225, 226, 227, 228,  23, 230, 231, 235, 236, 237,
    238,  24, 241, 245, 246, 247, 248,  25, 251, 256,
    257, 258, 259,  26, 260, 261, 263, 264, 265, 266,
    267,  27, 270, 271, 272, 273, 274, 275, 276, 278,
    280, 281, 282, 284, 285, 286, 287, 288, 289, 290,
    293, 296, 297, 298, 299,  30, 300, 302, 303, 304
    /* eslint-enable @typescript-eslint/indent */
  ])
  snapshotTestsGenerator('refer_to_mentor', [])
})
