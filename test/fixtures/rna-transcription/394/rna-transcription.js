export const toRna = (str) => {
  let rna = '';
  for (let i = 0; i < str.length; i++) {
    switch (str[i]) {
    case 'G': rna += 'C';
      break;
    case 'C': rna += 'G';
      break;
    case 'T': rna += 'A';
      break;
    case 'A': rna += 'U';
      break;
    default: throw new Error('Invalid input DNA.');
    }
  }
  return rna;
};
