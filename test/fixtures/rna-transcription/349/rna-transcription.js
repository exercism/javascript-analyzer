const translate = (base) => {
  switch (base) {
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
      throw new Error("Invalid input DNA.");
  }
}

export const toRna = (seq) => {
  return (seq.length) 
          ? seq.split('').map(e => translate(e)).join('')
          : seq;
};
