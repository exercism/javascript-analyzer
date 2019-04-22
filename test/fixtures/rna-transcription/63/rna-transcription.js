const complements = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

const mapper = (dna) => {
  if (!dna.match(/^[ACTG]+$/)) {
    throw new Error('Invalid input DNA.');
  } else {
    return complements[dna];
  }
};

const toRna = dna => dna
  .split('')
  .map(mapper)
  .join('');

export { toRna };
