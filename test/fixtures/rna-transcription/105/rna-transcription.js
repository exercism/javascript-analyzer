export const toRna = (dna) => {
  let compliment = '';

  [...dna].forEach((c) => {
    switch (c) {
      case 'C':
        compliment += 'G';
        return;
      case 'G':
        compliment += 'C';
        return;
      case 'A':
        compliment += 'U';
        return;
      case 'T':
        compliment += 'A';
        return;
      default:
        throw new Error('Invalid input DNA.');
    }
  });
  return compliment;
};
