const COMPLEMENTS = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

export const toRna = (DNA) => {
  if (DNA.match(/(?![CGTA])./g)) {
    throw new Error('Invalid input DNA.');
  }
  return DNA.split('').map(nucloid => COMPLEMENTS[nucloid]).join('');
};
