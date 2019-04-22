export const toRna = (dna) => {
  let rna = '';

  const nucleotides = ['C', 'G', 'A', 'T'];

  dna.split('').forEach((nucl) => {
    if (nucleotides.indexOf(nucl) === -1) {
      throw new Error('Invalid input DNA.');
    }

    switch (nucl) {
      case 'C':
        rna += 'G';
        break;
      case 'G':
        rna += 'C';
        break;
      case 'A':
        rna += 'U';
        break;
      case 'T':
        rna += 'A';
        break;
      default:
        rna += '';
        break;
    }
  });

  return rna;
};
