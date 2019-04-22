export const toRna = (dna) => {
  let o = '';
  for (let i = 0; i < dna.length; i += 1) {
    switch (dna[i]) {
      case 'G':
        o += 'C';
        break;
      case 'C':
        o += 'G';
        break;
      case 'T':
        o += 'A';
        break;
      case 'A':
        o += 'U';
        break;
      default:
        throw new Error('Invalid input DNA.');
    }
  }
  return o;
};
