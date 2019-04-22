const dnaToRnaMatching = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

function toRna(dnaString) {
  return dnaString
    .split('')
    .map((nucleotide) => {
      if (!(nucleotide in dnaToRnaMatching)) {
        throw new Error('Invalid input DNA.');
      }
      return dnaToRnaMatching[nucleotide];
    })
    .join('');
}

export { toRna };
