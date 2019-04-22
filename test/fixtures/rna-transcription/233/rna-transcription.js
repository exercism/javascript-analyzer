// Given a DNA strand, return its RNA complement (per RNA transcription).
// Given a DNA strand, its transcribed RNA strand is formed by replacing each nucleotide with its complement:
// G -> C
// C -> G
// T -> A
// A -> U

export const toRna = sequence => sequence
  .replace('A', 'U')
  .replace('T', 'A')
  .replace('G', 'X')
  .replace('C', 'G')
  .replace('X', 'C');
