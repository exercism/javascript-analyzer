export const toRna = (string) => {
  const array = string.split('');
  const rna = [];
  array.map((i) => {
    switch (i) {
      case 'G':
        rna.push('C')
        break;

      case 'C':
        rna.push('G')
        break;

      case 'T':
        rna.push('A')
        break;

      case 'A':
        rna.push('U')
        break;

      default:
        throw new Error('Invalid input DNA.')
        break;
    }
  });

  return rna.join('');
}