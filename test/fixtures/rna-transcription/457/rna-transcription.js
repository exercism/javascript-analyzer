const transform = (nucleotide) => {
  switch (nucleotide) {
    case 'G':
      return 'C';
    case 'C':
      return 'G';
    case 'T':
      return 'A';
    case 'A':
      return 'U';
    default:
      throw new Error('Invalid input DNA.');
  }
};

export const toRna = (dna) => {
  if (!dna) return '';
  const rna = dna.split('').map(e => transform(e));
  return rna.join('');
};
