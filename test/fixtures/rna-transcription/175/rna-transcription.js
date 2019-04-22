export const toRna = (dna) => {
  let newDna = '';
  for (let i = 0; i < dna.length; i++) {
    switch (dna.charAt(i)) {
      case 'G':
        newDna = newDna + 'C';
        break;
      case 'C':
        newDna = newDna + 'G';
        break;
      case 'T':
        newDna = newDna + 'A';
        break;
      case 'A':
        newDna = newDna + 'U';
        break;
      default:
        throw 'Invalid input DNA.';
    }
  }
  return newDna;
};
