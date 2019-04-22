const DNA_TO_RNA = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export const toRna = (DNA) => {
  if (/[^ACGT]/g.test(DNA)) throw new Error('Invalid input DNA.');
  return DNA.replace(/./g, char => DNA_TO_RNA[char]);
};
