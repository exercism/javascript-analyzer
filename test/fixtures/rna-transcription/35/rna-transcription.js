const RNA = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
  throwError: () => {
    throw new Error('Invalid input DNA.');
  },
};

export function toRna(nucleotides) {
  return nucleotides
    .split('')
    .map(n => RNA[n] || RNA.throwError())
    .join('');
}
