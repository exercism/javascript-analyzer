function charDnaToRna(char) {
  switch (char) {
    case 'G':
      return 'C';
    case 'C':
      return 'G';
    case 'T':
      return 'A';
    case 'A':
      return 'U';
    default:
      return '0';
  }
}

export const toRna = dna => {
  // test for null or empty values
  if (dna === undefined || dna === null || dna === '') return '';

  // iterate over the string argument 'dna' and convert each letter to its rna equivalent
  const rnaString = [...dna].map(x => charDnaToRna(x)).join('');

  // if there are any '0' characters then there must be an error
  if (rnaString.includes('0')) {
    throw new Error('Invalid input DNA.');
  }
  return rnaString; // success!
};
