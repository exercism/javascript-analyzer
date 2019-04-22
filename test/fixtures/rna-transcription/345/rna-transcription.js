/**
 * @param {string} dna
 */

export const toRna = (dnaInput) => {
  const dna = dnaInput.toUpperCase();
  let rna = '';
  for (let i = 0; i < dna.length; i += 1) {
    switch (dna[i]) {
      case 'A':
        rna = rna.concat('', 'U');
        break;
      case 'C':
        rna = rna.concat('', 'G');
        break;
      case 'G':
        rna = rna.concat('', 'C');
        break;
      case 'T':
        rna = rna.concat('', 'A');
        break;
      default:
        throw new Error('Invalid input DNA.');
    }
  }
  return rna;
};
