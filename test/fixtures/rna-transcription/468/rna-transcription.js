const trans = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export const toRna = (dna) => {
  if (dna.length === 0) {
    return dna;
  }

  if (/[^GCTA]/g.test(dna)) {
    throw new Error('Invalid input DNA.');
  }

  return dna.replace(/[GCTA]/g, match => trans[match]);
};
