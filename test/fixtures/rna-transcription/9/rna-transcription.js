// Given a DNA strand, its transcribed RNA strand is formed by replacing
// each nucleotide with its complement:
// * `G` -> `C`
// * `C` -> `G`
// * `T` -> `A`
// * `A` -> `U`

const complement = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U'
};

export const toRna = dna => {
  // Check for invalid input first.
  if (dna.match(/[^ACGT]/g)) {
    throw new Error('Invalid input DNA.');
  }

  return dna.replace(/[ACGT]/g, nucleotide => complement[nucleotide]);
};
