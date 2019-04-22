export const toRna = (str) => {
  if (str.length === 0) return str;
  return str
    .split('')
    .map((nuc) => {
      switch (nuc) {
        case 'A':
          return 'U';
        case 'C':
          return 'G';
        case 'G':
          return 'C';
        case 'T':
          return 'A';
        default:
          throw new Error('Invalid input DNA.');
      }
    })
    .join('');
};
