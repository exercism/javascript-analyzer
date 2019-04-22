const toRna = (dna) => {
  const memo = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };
  let rna = '';
  for (let i = 0; i < dna.length; i++) {
    if (memo[dna[i]] === undefined) {
      throw 'Invalid input DNA.';
    }
    rna += memo[dna[i]];
  }
  return rna;
};

module.exports = { toRna };
