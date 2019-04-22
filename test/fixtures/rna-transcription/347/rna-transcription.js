function toRna(input) {
  const dnaToRna = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };
  let result = '';
  for (const item of input) {
    if (dnaToRna[item]) {
      result += dnaToRna[item];
    } else {
      throw new Error('Invalid input DNA.');
    }
  }
  return result;
}

export { toRna };
