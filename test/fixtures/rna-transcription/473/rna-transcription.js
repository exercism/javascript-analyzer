export const toRna = (dna) => {
  switch(dna) {
    case 'G':
      return 'C';
      break;
    case 'C':
      return 'G';
      break;
    case 'T':
      return 'A';
      break;
    case 'A':
      return 'U';
      break;
    default:
      return '';
      break;
  }
};