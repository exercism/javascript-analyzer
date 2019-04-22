export function toRna(dnaSequence) {
  let rnaSequence = '';

  dnaSequence.split('').forEach(nucleotide => {
    if (nucleotide === 'A') rnaSequence += 'U'
    else if (nucleotide === 'C') rnaSequence += 'G'
    else if (nucleotide === 'G') rnaSequence += 'C'
    else if (nucleotide === 'T') rnaSequence += 'A'
    else 
      throw new Error('Invalid input DNA.');
  })

  return rnaSequence;
}