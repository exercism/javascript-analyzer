export const toRna = (dna) => {
  if (typeof(dna) !== 'string') {
    throw new Error('Invalid input DNA.');
  }
  const rna = [];
  dna.split('').forEach(nucleotide => {
    if (nucleotide === 'C') { rna.push('G') }
    else if (nucleotide === 'G') { rna.push('C') }
    else if (nucleotide === 'A') { rna.push('U') }
    else if (nucleotide === 'T') { rna.push('A') }
    else { throw new Error('Invalid input DNA.')}
  });
  return rna.join('');
}
