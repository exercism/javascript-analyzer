export const toRna = (nucleotide) => {
  let rna = '';
  for (let i = 0; i < nucleotide.length; i++) {
    switch (nucleotide[i]) {
      case '': {
        rna += nucleotide[i];
        break;
      }
      case 'G': {
        rna += nucleotide[i].replace('G', 'C');
        break;
      }
      case 'C': {
        rna += nucleotide[i].replace('C', 'G');
        break;
      }
      case 'T': {
        rna += nucleotide[i].replace('T', 'A');
        break;
      }
      case 'A': {
        rna += nucleotide[i].replace('A', 'U');
        break;
      }
      case 'U': {
        throw new Error('Invalid input DNA.');
      }
      default : {
        throw new Error('Invalid input DNA.');
      }
    }
  }
  return rna;
};
