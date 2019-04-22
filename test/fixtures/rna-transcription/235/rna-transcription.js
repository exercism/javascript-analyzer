const rnaMapping = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

const translate = mapping => ((base) => {
  const rna = mapping[base];
  if (rna) return rna;
  throw new Error('Invalid input DNA.');
});

export const toRna = (dna = []) => [].map.call(dna, translate(rnaMapping)).join('');
