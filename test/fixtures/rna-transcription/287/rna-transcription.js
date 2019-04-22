export function toRna(dna) {
  let rna = '';

  if (dna.length == 0)
    return rna;

  for (let nucleotide of dna) {
    if (nucleotide == 'G') rna += 'C';
    else if (nucleotide == 'C') rna += 'G';
    else if (nucleotide == 'T') rna += 'A';
    else if (nucleotide == 'A') rna += 'U';
    else throw new Error('Invalid input DNA.');
  }

  return rna;
}
