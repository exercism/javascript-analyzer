export const toRna = (dna) => {
  const pairs = {
    C: 'G', G: 'C', A: 'U', T: 'A',
  };

  return dna.split('').map(i => pairs[i]).join('');
};
