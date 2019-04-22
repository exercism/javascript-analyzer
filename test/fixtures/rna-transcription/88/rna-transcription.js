export const toRna = (input) => {
  const map = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };
  let res = '';
  for (const i of input) {
    if (!map[i]) {
      throw new Error('Invalid input DNA.');
    }
    res += map[i];
  }
  return res;
};
