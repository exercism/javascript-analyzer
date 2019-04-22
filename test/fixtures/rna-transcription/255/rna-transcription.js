const conversionSet = {
  C: 'G',
  G: 'C',
  A: 'U',
  T: 'A',
};

export const toRna = (dna) => {
  if (!dna) return '';

  const rna = dna.replace(/./g, toReplace => conversionSet[toReplace]);
  
  if (rna.length !== dna.length) throw new Error('Invalid input DNA.');
  return rna;
}
