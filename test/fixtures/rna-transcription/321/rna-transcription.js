export const toRna = (dnaStr) => {
  const dnaArr = dnaStr.split('');
  const rnaArr = dnaArr.map((nucleotide) => {
    if (nucleotide === 'G' || nucleotide === 'C' || nucleotide === 'T' || nucleotide === 'A') {
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
          break;
      }
    } else {
      throw new Error('Invalid input DNA.');
    }
  });
  return rnaArr.join('');
};
