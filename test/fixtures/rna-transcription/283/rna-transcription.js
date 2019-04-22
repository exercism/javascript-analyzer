function complementOf(nucleotide) {
  switch (nucleotide) {
    case 'C':
      return 'G';
    case 'G':
      return 'C';
    case 'A':
      return 'U';
    case 'T':
      return 'A';
    default:
      throw new Error('Invalid nucleotide.');
  }
};

export const toRna = (dna) => {
  try {
    const nucleotides = dna.trim().split('');

    if (nucleotides.length === 0) {
      return '';
    } else {
      return nucleotides.map(complementOf).join('');
    }
  } catch (err) {
    throw new Error('Invalid input DNA.');
  }
};

