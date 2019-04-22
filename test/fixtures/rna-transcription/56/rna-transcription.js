export const toRna = (dna) => {
  let rna = '';
  for (let i = 0; i < dna.length; i += 1) {
    switch (dna[i]) {
      case 'G': rna += 'C'; break;
      case 'C': rna += 'G'; break;
      case 'T': rna += 'A'; break;
      case 'A': rna += 'U'; break;
      default: throw new Error('Invalid input DNA.');
    }
  }
  return rna;
};
