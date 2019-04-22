export const toRna = (dna) => {
  const data = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };
  return dna
    .split('')
    .map((item) => {
      if (Object.keys(data).includes(item)) {
        return data[item];
      }
      throw new Error('Invalid input DNA.');
    })
    .join('');
};
