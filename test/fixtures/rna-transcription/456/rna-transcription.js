/* eslint-disable linebreak-style */
export const toRna = (sequence) => {
  const DNATORNA = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };
  return sequence.split('').map((x) => {
    if (!DNATORNA[x]) {
      throw new Error('Invalid input DNA.');
    }
    return DNATORNA[x];
  }).join('');
};
