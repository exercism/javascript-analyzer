const toRna = (dnaStrand) => {
  let rnaStrand = '';
  for (const x of dnaStrand) {
    switch (x) {
      case 'G':
        rnaStrand += 'C';
        break;
      case 'C':
        rnaStrand += 'G';
        break;
      case 'T':
        rnaStrand += 'A';
        break;
      case 'A':
        rnaStrand += 'U';
        break;
      default:
        throw new Error('Invalid input DNA.');
    }
  }
  return rnaStrand;
};

export { toRna };
