const lookup = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export const toRna = (dna) => {
  function dnaToRna(match, p1) {
    if (p1) {
      throw new Error('Invalid input DNA.');
    }
    return lookup[match];
  }

  return dna.replace(/[GCTA]|(.)/g, dnaToRna);
};
