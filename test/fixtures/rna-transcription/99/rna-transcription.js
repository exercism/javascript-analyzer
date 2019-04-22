const dToRMap = new Map();
dToRMap.set('G', 'C');
dToRMap.set('C', 'G');
dToRMap.set('T', 'A');
dToRMap.set('A', 'U');

export const toRna = (Dna) => {
  let Rna = '';
  for (let i = 0; i < Dna.length; i += 1) {
    if (Dna.charAt(i) !== 'G' && Dna.charAt(i) !== 'C' && Dna.charAt(i) !== 'T' && Dna.charAt(i) !== 'A') {
      throw new Error('Invalid input DNA.');
    }
    Rna += dToRMap.get(Dna.charAt(i));
  }
  return Rna;
};
