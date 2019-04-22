// Given a DNA strand, its transcribed RNA strand is formed by replacing
// each nucleotide with its complement:
//
// * `G` -> `C`
// * `C` -> `G`
// * `T` -> `A`
// * `A` -> `U`

const DNA_TO_RNA = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export const toRna = function toRna(dna) {
  if (dna === '') { return ''; }
  if (!/^[ACGT]+$/.test(dna)) {
    throw (new RangeError('Invalid input DNA.'));
  }
  return dna.split('').map(code => DNA_TO_RNA[code]).join('');
};
