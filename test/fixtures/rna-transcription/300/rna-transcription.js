export const toRna = (DNA) => {
  if (DNA.match(/[^CGAT]/)) {
    throw new Error('Invalid input DNA.');
  }
  const DNAtoRNA = {
    C: 'G',
    G: 'C',
    A: 'U',
    T: 'A',
  };
  return DNA.replace(/[CGAT]/g, nucleotide => DNAtoRNA[nucleotide]);
};
