const dnaToRnaMapping = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

function toRna(dna) {
  const rna = dna.split('').map((nucleotide) => {
    if (!dnaToRnaMapping[nucleotide]) throw new Error('Invalid input DNA.');
    nucleotide = dnaToRnaMapping[nucleotide];
    return nucleotide;
  });
  return rna.join('')
}

export { toRna };
