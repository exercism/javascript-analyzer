export const toRna = (input) => {
  const mapping = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };
  const chars = input.split('').map((n) => {
    if (!mapping[n]) {
      throw new Error('Invalid input DNA.');
    }
    return mapping[n];
  });
  return !input ? '' : chars.join('');
};
