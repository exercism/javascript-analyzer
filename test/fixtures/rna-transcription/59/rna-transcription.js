const transcribe = (nucleotide) => {
  switch (nucleotide) {
    case 'G':
      return 'C';
    case 'C':
      return 'G';
    case 'T':
      return 'A';
    case 'A':
      return 'U';
    default:
      throw new Error('Invalid input DNA.');
  }
};

export const toRna = (DNA) => {
  const nucleotides = DNA.split('');
  return nucleotides.map(transcribe).join('');
};
