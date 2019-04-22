export const toRna = (text) => {
  const dnaToRnaMapping = {
    'C': 'G',
    'G': 'C',
    'A': 'U',
    'T': 'A',
};

  let output = '';

  for (let i = 0; i < text.length; i++) {
    const dnaLetter = text[i];
    const rnaLetter = dnaToRnaMapping[dnaLetter];
    if (rnaLetter === undefined) {
      throw new Error('Invalid input DNA.');
    }
    output = output + dnaToRnaMapping[dnaLetter];
  }

  return output;
};
