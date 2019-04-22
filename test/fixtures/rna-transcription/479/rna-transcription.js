const RnaComplements = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export const toRna = (str) => {
  const strArray = str.split('');
  const transcribed = strArray.map((nucleotide) => {
    if (RnaComplements[nucleotide]) {
      return RnaComplements[nucleotide];
    }
    throw new Error('Invalid input DNA.');
  });
  return transcribed.join('');
};
