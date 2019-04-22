export const toRna = (dna) => {
  let rna = '';
  let i = 0;
  while (i < dna.length) {
    switch (dna.charAt(i)) {
      case 'G':
        rna += 'C';
        break;
      case 'C':
        rna += 'G';
        break;
      case 'T':
        rna += 'A';
        break;
      case 'A':
        rna += 'U';
        break;
      default:
        throw new Error('Invalid input DNA.');
    }
    i += 1;
  }
  return rna;
};
