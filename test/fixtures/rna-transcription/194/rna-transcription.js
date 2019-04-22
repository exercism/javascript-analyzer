export const toRna = (dnaString) => {
  const chars = dnaString.split('');
  let rna = '';
  for (const i of chars) {
    switch (i.toUpperCase()) {
      case 'G':
        rna += 'C'
        break;
      case 'C':
        rna += 'G'
        break;
      case 'T':
        rna += 'A'
        break;
      case 'A':
        rna += 'U'
        break;
      default:
        throw new Error('Invalid input DNA.');
    }
  }
  return rna
}