// Exercise:   RNA Transcription
// Iteration:  01

const compPairs = {
  'G': 'C',
  'C': 'G',
  'T': 'A',
  'A': 'U'
};

export const toRna = (dnaStrand) => {
  if(dnaStrand === '') return '';

  let rnaStrand = '';

  dnaStrand.split('').forEach(function(nucleotide) {
    if(compPairs.hasOwnProperty(nucleotide))
      rnaStrand += compPairs[nucleotide];
    else
      throw "Invalid input DNA.";
  });

  return rnaStrand;
}
