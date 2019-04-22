const filterDna = (nucleotide) => {
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
      return 'Invalid';
  }
};

const hasErrorOnRna = rna => rna.filter(el => el === 'Invalid');

export const toRna = (dnaString) => {
  const inputedDna = Array.from(dnaString);
  const returnedRna = inputedDna.map(filterDna);
  const rnaErrors = hasErrorOnRna(returnedRna);

  if (rnaErrors.length) {
    throw new Error('Invalid input DNA.');
  }

  return returnedRna.join('');
};
