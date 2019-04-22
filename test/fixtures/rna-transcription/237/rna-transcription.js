const mapping = { 'G': 'C', 'C': 'G', 'T': 'A', 'A': 'U' };

export const toRna = (strand) => {
  let nucleotides = strand.split('');
  if (nucleotides.some(nucleotide => 'GCTA'.indexOf(nucleotide) == -1)) throw new Error('Invalid input DNA.');
  return nucleotides.map(nucleotide => mapping[nucleotide]).join('');
};
