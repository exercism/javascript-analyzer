const EMPTY_STRING = '';

const DNA_CONVERTIONS = {
  A: 'U',
  C: 'G',
  G: 'C',
  T: 'A',
};

export const checkDna = (dna) => {
  const isValid = Object
    .keys(DNA_CONVERTIONS)
    .reduce((acc, key) => acc || key == dna, false);
  if (!isValid) {
    throw new Error('Invalid input DNA.');
  }
};

export const toRna = (dna) => {
  return dna
    .split(EMPTY_STRING)
    .map(char => {
      checkDna(char);
      return DNA_CONVERTIONS[char];
    }).join(EMPTY_STRING);
};

