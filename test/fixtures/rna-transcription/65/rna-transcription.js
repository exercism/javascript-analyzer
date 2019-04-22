export const toRna = (sequence) => {
  const dna = sequence.split('');
  for (let index = 0; index < dna.length; index++){
    switch (dna[index]) {
      case 'C':
        dna[index] = 'G';
        break;
      case 'G':
        dna[index] = 'C';
        break;
      case 'A':
        dna[index] = 'U';
        break;
      case 'T':
        dna[index] = 'A';
        break;
      default:
        throw new Error('Invalid input DNA.');
    }
  }
  return dna.join('');
};
