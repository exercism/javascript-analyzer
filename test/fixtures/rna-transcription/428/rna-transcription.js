const dnaMap = {
  C: 'G',
  G: 'C',
  A: 'U',
  T: 'A'
};

export const toRna = (dna) => {  
  if (dna.length === 0) return '';
  return dna.split('').map(nuc => {
    if (dnaMap[nuc]) {
      return dnaMap[nuc];
    }
    throw new Error('Invalid input DNA.');
  }).join('');
};
