export const toRna = (str) => {
  const strand = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };
  const temporary = str.split('');

  const result = temporary.map((char) => {
    if (!strand[char]) {
      throw new Error('Invalid input DNA.');
    } else {
      return strand[char];
    }
  });

  return result.join('');
};
