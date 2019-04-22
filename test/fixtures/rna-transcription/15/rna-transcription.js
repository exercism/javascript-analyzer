export const toRna = (dna) => {
  if (dna === '') {
    return '';
  }

  let rna = '';
  const dnaArr = dna.split('');

  dnaArr.map((el) => {
    switch (el) {
      case 'A':
        rna += 'U';
        break;
      case 'C':
        rna += 'G';
        break;
      case 'G':
        rna += 'C';
        break;
      case 'T':
        rna += 'A';
        break;
      default:
        throw new Error('Invalid input DNA.');
    }
  });
  return rna;
};
