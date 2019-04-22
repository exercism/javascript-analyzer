function toRna(dna) {
  if (dna === '') {
    return '';
  }
  const regex = /[CGTA]+/;
  const match = dna.match(regex);
  const error = 'Invalid input DNA.';
  if (match === null) {
    throw new Error(error);
  }
  if (match[0].length !== dna.length) {
    throw new Error(error);
  }

  let rna = '';
  for (let i = 0; i < dna.length; i++) {
    switch (dna[i]) {
      case 'C':
        rna += dna[i].replace('C', 'G')
        break;
      case 'G':
        rna += dna[i].replace('G', 'C')
        break;
      case 'A':
        rna += dna[i].replace('A', 'U')
        break;
      case 'T':
        rna += dna[i].replace('T', 'A')
        break;
    }
  }
  return rna;
}

module.exports = {
  toRna,
};
