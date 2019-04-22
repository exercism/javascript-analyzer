export const toRna = (dna) => {
  let rna = '';
  const transcription = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };
  dna.split('').forEach((strand) => {
    if (transcription[strand]) {
      rna += transcription[strand];
    } else {
      throw new Error('Invalid input DNA.');
    }
  });
  return rna;
};
