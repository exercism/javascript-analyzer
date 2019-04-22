const complements = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

const toRna = dna => (/[^ACTG]/g.exec(dna)
  ? (() => {
    throw new Error('Invalid input DNA.');
  })()
  : dna
    .split('')
    .map(n => complements[n])
    .join(''));

export { toRna };
