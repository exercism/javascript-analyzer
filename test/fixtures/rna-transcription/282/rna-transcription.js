export const toRna = (dna) => {
  let rna = '';
  for (let i = 0; i < dna.length; i++) {
    switch(dna.charAt(i)) {
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
        throw 'Invalid input DNA.' 
    }
  }
  return rna;
};
