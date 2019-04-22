export const toRna = (rna) => {
  const chars = rna.split('');
  let res = '';

  chars.forEach((e) => {
    switch (e) {
      case 'G':
        res += 'C';
        break;
      case 'C':
        res += 'G';
        break;
      case 'T':
        res += 'A';
        break;
      case 'A':
        res += 'U';
        break;
      default:
        throw new Error('Invalid input DNA.');
    }
  });

  return res;
};
