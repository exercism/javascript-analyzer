
export const toRna = (fromDna) => {
  let rna = '';
  let dnaToRna = ''

  for(let i = 0; i < fromDna.length; i++) {

    switch (fromDna[i]) {
      case 'C':
        dnaToRna = 'G'
        break;
      case 'G':
        dnaToRna = 'C'
        break;
      case 'A':
        dnaToRna = 'U'
        break;
      case 'T':
        dnaToRna = 'A'
        break;
      default:
        throw new Error('Invalid input DNA.');
        break;
    }
     rna += dnaToRna;
  }
  return rna;
};
