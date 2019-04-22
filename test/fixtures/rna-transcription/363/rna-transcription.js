const convertNucleotide = (nucleotide) => {
  switch (nucleotide) {
    case 'G': return 'C';
    case 'C': return 'G';
    case 'T': return 'A';
    case 'A': return 'U';
    default:
      throw new Error('Invalid input DNA.');
  }
};

export const toRna = (dna) => {
  if (typeof dna !== 'string') return undefined;

  const rna = [...dna].map(n => convertNucleotide(n));
  return rna.join('');
};
