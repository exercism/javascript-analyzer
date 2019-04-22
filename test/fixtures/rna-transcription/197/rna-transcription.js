const rna = {
  A: 'U',
  C: 'G',
  G: 'C',
  T: 'A',
};

export const toRna = (dna) => {
  if (!/^[ACGT]*$/g.test(dna)) {
    throw new Error('Invalid input DNA.');
  }

  return dna.split('').map(nucleotide => rna[nucleotide]).join('');
};
