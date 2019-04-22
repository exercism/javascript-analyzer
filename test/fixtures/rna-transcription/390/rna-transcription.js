const converter = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export const toRna = (dna) => {
  if (dna.length === 0) return dna;

  return dna.split('').reduce((rna, nucleotide) => {
    if (!Object.keys(converter).includes(nucleotide)) {
      throw new Error('Invalid input DNA.');
    }
    return rna + converter[nucleotide];
  }, '');
};
