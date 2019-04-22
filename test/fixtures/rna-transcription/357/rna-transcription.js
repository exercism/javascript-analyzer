const dnaToRna = {
  'G': 'C',
  'C': 'G',
  'T': 'A',
  'A': 'U'
};

export const toRna = dna => dna.split('').map(d => {
  const translation = dnaToRna[d];
  if (!translation) throw 'Invalid input DNA.';
  return translation;
}).join('');
