export const toRna = (Dna) => {
  const map = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };

  let Rna = '';
  for (let i = 0; i < Dna.length; i += 1) {
    if (!map.hasOwnProperty(Dna[i])) throw new Error('Invalid input DNA.');
    Rna += map[Dna[i]];
  }
  return Rna;
};
