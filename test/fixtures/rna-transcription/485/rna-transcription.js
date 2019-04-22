const rnaKey = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export function toRna(dna) {
  const dnaArray = dna.split('');
  const rnaArray = [];

  dnaArray.forEach((element) => {
    if (element === '') {
      rnaArray.push('');
    } else if (rnaKey[element]) {
      rnaArray.push(rnaKey[element]);
    } else {
      throw new Error('Invalid input DNA.');
    }
  });

  return rnaArray.join('');
}
