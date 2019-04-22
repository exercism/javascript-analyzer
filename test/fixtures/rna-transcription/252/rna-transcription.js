export const toRna = (strand) => {
  const rnaStrings = {
    'A': 'U',
    'C': 'G',
    'G': 'C',
    'T': 'A',
    '': ''
  }
  if (rnaStrings[strand] === undefined) {
    let dnaString = '';
    for (const char of strand) {
      if (rnaStrings[char] === undefined) {
        throw new Error('Invalid input DNA.');
      } else {
        dnaString += rnaStrings[char];
      }
    }
    return dnaString;
  } else {
    return rnaStrings[strand];
  }
};
