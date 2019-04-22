export const toRna = sequence => {
  let rna = '';
  sequence.split('').forEach(nucleotide => {
    switch (nucleotide) {
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
        throw new Error('Invalid input DNA.')
    }
  })
  return rna;
}


// * `G` -> `C`
// * `C` -> `G`
// * `T` -> `A`
// * `A` -> `U`