export const toRna = (rna = '') => {
  return rna.split('')
  .map((char)=> {
    switch(char){
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
        throw "Invalid input DNA.";
    }
  })
  .join('');
};
