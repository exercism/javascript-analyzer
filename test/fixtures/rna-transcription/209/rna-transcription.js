export const toRna = string => {
  let rna = '';
  for (let i = 0; i < string.length; i++) {
    switch (string[i]) {
      case 'C': 
        rna += 'G';
        break;
      case 'G': 
        rna += 'C';
        break;
      case 'A':
        rna += 'U';
        break;
      case 'T':
        rna += 'A';
        break;
      default:
        throw new Error('Invalid input DNA.');
    }
  }
  return rna;
}
