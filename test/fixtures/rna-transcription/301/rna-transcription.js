export const toRna = (dna) => {
  const dnaToRnaMap = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };

  // Handles empty dna sequence
  if (!dna) {
    return '';
  }

  // Handles invalid dna input
  if (/[^GCTA]/g.test(dna)) {
    throw new Error('Invalid input DNA.');
  }

  // Replaces characters and returns RNA
  return dna.replace(/[GCTA]/g, nucleotide => dnaToRnaMap[nucleotide]);
};
