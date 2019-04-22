export const toRna = dna => {
  let rna = '';
  const VALID_DNA_NUCLEOTIDES = ['G', 'C', 'T', 'A'];
  dna = dna.toUpperCase();
  for (let i = 0; i < dna.length; i++) {
    if (VALID_DNA_NUCLEOTIDES.indexOf(dna[i]) < 0) {
      throw new Error('Invalid input DNA.');
    }
    rna += dnaNucleotideToRna(dna[i]);
  }
  return rna;
}

function dnaNucleotideToRna(nucleotide) {
  switch(nucleotide) {
    case 'G':
      return 'C';
    case 'C':
      return 'G';
    case 'T':
      return 'A';
    case 'A':
      return 'U';
    default:
      return;
  }
}