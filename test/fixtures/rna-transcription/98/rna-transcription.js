export const toRna = (dnaSequence) => {
  if(dnaSequence.match(/[^TCGA]/g) !== null) {
    throw Error('Invalid input DNA.');
  }

  const conversion = {
    'G': 'C',
    'C': 'G',
    'T': 'A',
    'A': 'U'
  }

  let rna = dnaSequence.split('').map(nucleotide => conversion[nucleotide]);

  return rna.join('');
}
