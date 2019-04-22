const findPair = (b) => {
  switch (b) {
    case 'G': return 'C';
    case 'C': return 'G';
    case 'T': return 'A';
    case 'A': return 'U';
    default: throw new Error('Invalid input DNA.');
  }
};

export const toRna = dna => dna.split('').map(b => findPair(b)).join('');
