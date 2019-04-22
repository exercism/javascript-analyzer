export const toRna = (strand) => {
  let rna = '';
  for (var index = 0; index < strand.length; index++){
    switch (strand.charAt(index)) {
      case 'G':
        rna += 'C'
        break;
      case 'C':
        rna += 'G'
        break;
      case 'A':
        rna += 'U'
        break;
      case 'T':
        rna += 'A'
        break;
      default:
        throw new Error('Invalid input DNA.');

    }
  }
  return rna;
}
