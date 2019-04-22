export const toRna = dna => {
  const conversions = {
    'G': 'C',
    'C': 'G',
    'T': 'A',
    'A': 'U'
  };
  const re = /[^ACTG]+/g;
  let rna = '';

  if (dna.match(re) !== null) {
    throw new Error('Invalid input DNA.');
  } else {
    for (let i = 0; i < dna.length; i++) {
      rna += conversions[dna[i]];
    }
  }

  return rna;
}
