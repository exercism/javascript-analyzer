export const toRna = (dna) => {
  let rna = '';
  for (let i = 0; i < dna.length; i += 1) {
    if (dna.charAt(i) === 'G') {
      rna += 'C';
    } else if (dna.charAt(i) === 'C') {
      rna += 'G';
    } else if (dna.charAt(i) === 'T') {
      rna += 'A';
    } else if (dna.charAt(i) === 'A') {
      rna += 'U';
    }
  }
  if (dna.length !== rna.length) {
    throw new Error('Invalid input DNA.');
  } else return rna;
};
