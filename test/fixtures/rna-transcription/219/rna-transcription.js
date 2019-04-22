const dnaToRnaMapping = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U'
};

export function toRna(dna) {
  let rna = '';

  for (let i = 0; i < dna.length; ++i) {
    const rnaNucleotide = dnaToRnaMapping[dna[i]]

    if (!rnaNucleotide) {
      throw new Error('Invalid input DNA.');
    }

    rna += rnaNucleotide;
  }

  return rna;
};