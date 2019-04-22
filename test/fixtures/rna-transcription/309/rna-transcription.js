export const toRna = dna => dna.split('')
  .map((symbol) => {
    switch (symbol) {
      case 'G': return 'C';
      case 'C': return 'G';
      case 'T': return 'A';
      case 'A': return 'U';
      default: throw new Error('Invalid input DNA.');
    }
  }).join('');
