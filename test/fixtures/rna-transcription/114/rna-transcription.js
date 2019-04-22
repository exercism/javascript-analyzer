const pairs = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export function toRna(sequence) {
  return sequence
    .split('')
    .reduce((rna, dna) => {
      const rnaEquivalent = pairs[dna];

      if (!rnaEquivalent) {
        throw new Error('Invalid input DNA.');
      }

      return rna + rnaEquivalent;
    }, '');
}
