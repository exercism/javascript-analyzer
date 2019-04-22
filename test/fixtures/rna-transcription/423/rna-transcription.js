const isValidDna = (dnaString) => {
  const regex = /[^GCTA]/g;
  return !regex.test(dnaString);
};

const convertNucleotide = (n) => {
  let result;

  result = n === 'G' && 'C';
  result = n === 'C' && 'G';
  result = n === 'T' && 'A';
  result = n === 'A' && 'U';

  return result;
};

export const toRna = (dnaString) => {
  if (isValidDna(dnaString)) {
    return dnaString.split('').map(n => convertNucleotide(n)).join('');
  }

  throw new Error('Invalid input DNA.');
};
