
const transToRna = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export const toRna = (dna) => {
  const validDna = ['C', 'G', 'T', 'A']
  dna.split('').forEach((nucleotide) => {
    if (!validDna.includes(nucleotide)) {
      throw new Error('Invalid input DNA.');
    }
  });

  const rna = dna.replace(/./g, nucleotide => transToRna[nucleotide]);
  return rna;
};
