export const toRna = dnaStrand => [...dnaStrand].reduce((rnaStrand, singleStrand) => {
  switch (singleStrand) {
    case 'G':
      return `${rnaStrand}C`;
    case 'C':
      return `${rnaStrand}G`;
    case 'T':
      return `${rnaStrand}A`;
    case 'A':
      return `${rnaStrand}U`;
    case '':
      return `${rnaStrand}`;
    default:
      throw new Error('Invalid input DNA.');
  }
}, '');
