const rules = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export function toRna(dna) {
  return dna
    .split('')
    .map((item) => {
      if (rules[item]) {
        return rules[item];
      }

      throw new Error('Invalid input DNA.');
    })
    .join('');
}
