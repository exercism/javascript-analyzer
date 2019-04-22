const nucleotideEquivalents = {
  'G': 'C',
  'C': 'G',
  'T': 'A',
  'A': 'U',
}

export const toRna = function(dnaStrand) {
  return dnaStrand.split('').map(nucleotide => convertToRna(nucleotide)).join('');
};

function convertToRna(nucleotide) {
  let rna = nucleotideEquivalents[nucleotide];
  if (rna == undefined) {
    throw 'Invalid input DNA.'
  } else {
    return rna
  }
}
