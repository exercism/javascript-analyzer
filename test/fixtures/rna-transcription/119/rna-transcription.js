export const toRna = (adn) => {
  const rnaComplement = (nucleotide) => {
    switch (nucleotide) {
      case 'G': return 'C';
      case 'C': return 'G';
      case 'T': return 'A';
      case 'A': return 'U';
      default: throw Error('Invalid input DNA.');
    }
  };
  return adn.split('').map(rnaComplement).join('');
};
