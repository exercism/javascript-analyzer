const dnaToRna = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

const invalidError = new Error('Invalid input DNA.');

export const toRna = (dna) => {
  const dnaLetters = dna.split('');
  const rnaLetters = dnaLetters.map((dnaLetter) => {
    const rnaLetter = dnaToRna[dnaLetter];
    if (!rnaLetter) {
      throw invalidError;
    }
    return rnaLetter;
  });
  return rnaLetters.join('');
};
