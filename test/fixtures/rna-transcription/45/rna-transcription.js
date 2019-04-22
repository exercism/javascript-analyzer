export const toRna = (dna = '') => {
  const SEPARATOR = '';
  const dnaArr = dna.split(SEPARATOR);
  const validDnaArr = dnaArr.filter(letter => ['G', 'C', 'T', 'A'].includes(letter));

  if (dnaArr.length !== validDnaArr.length) {
    throw new Error('Invalid input DNA.');
  }

  return dnaArr.map(letter => ({
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  }[letter]))
    .join(SEPARATOR);
};
