export const toRna = (dna) => {
  const dnaToRnaMappings = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };

  const errorMessage = 'Invalid input DNA.';

  if (dna === '') {
    return '';
  }
  const result = dna.split('').reduce((output, currentLetter) => {
    const letter = dnaToRnaMappings[currentLetter];
    if (!letter) {
      throw new Error(errorMessage);
    }
    output += letter;
    return output;
  }, '');

  return result;
};
