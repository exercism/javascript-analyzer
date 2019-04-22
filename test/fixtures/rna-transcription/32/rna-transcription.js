const rnaMap = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

const isValidDNASequence = dna => dna.split('').every(c => rnaMap[c]);

const toRna = (dna) => {
  if (dna === '') return '';
  if (!isValidDNASequence(dna)) throw new Error('Invalid input DNA.');

  return dna
    .split('')
    .map(c => rnaMap[c])
    .join('');
};

export { toRna };
