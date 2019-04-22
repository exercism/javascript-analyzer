export const toRna = dnaSequence => {
  let rnaSequence = dnaSequence.split('');
  rnaSequence = rnaSequence.map(letter => {
    if (letter === 'g' || letter === 'G') return 'C';
    if (letter === 'c' || letter === 'C') return 'G';
    if (letter === 't' || letter === 'T') return 'A';
    if (letter === 'a' || letter === 'A') return 'U';
    throw 'Invalid input DNA.';
  });
  return rnaSequence.join('');
};
