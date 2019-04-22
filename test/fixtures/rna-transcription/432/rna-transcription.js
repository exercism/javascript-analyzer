export const toRna = (dna) => {
  if (!dna) return dna;
  if (isInvalid(dna)) throw new Error('Invalid input DNA.');

  return dna.replace(/C|G|A|T/g, transribe);
};

const isInvalid = dna => !!dna.match(/[^CGAT]/);

const transribe = (nucleotide) => {
  if (nucleotide === 'C') return 'G';
  if (nucleotide === 'G') return 'C';
  if (nucleotide === 'A') return 'U';
  return 'A';
};
