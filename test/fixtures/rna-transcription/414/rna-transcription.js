export const toRna = (dna) => {
  const changer = (char) => {
    switch (char) {
      case 'G':
        return 'C';
      case 'C':
        return 'G';
      case 'T':
        return 'A';
      case 'A':
        return 'U';
      default:
        throw new Error('Invalid input DNA.');
    }
  };

  let rna = '';
  for (let i = 0; i < dna.length; i += 1) {
    rna = `${rna}${changer(dna[i])}`;
  }
  return rna;
};
