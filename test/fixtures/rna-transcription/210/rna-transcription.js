const rnaMapping = (nucleotide = '') => {
  switch (nucleotide.toUpperCase()) {
    case 'G':
      return 'C';
    case 'C':
      return 'G';
    case 'T':
      return 'A';
    case 'A':
      return 'U';
    default:
      return '';
  }
};

export const toRna = (rna = '') => {
  const transformed = rna
    .split('')
    .map(rnaMapping)
    .join('');
  if (transformed.length !== rna.length) throw new Error('Invalid input DNA.');
  return transformed;
};
