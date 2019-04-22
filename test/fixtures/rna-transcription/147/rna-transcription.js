/* eslint-disable no-restricted-syntax */
export const toRna = (dnaStrand) => {
  const DICT = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };

  if (dnaStrand === '') {
    return '';
  }

  let rnaStrand = '';
  for (const dnaNucleotide of dnaStrand.split('')) {
    const rnaNucleotide = DICT[dnaNucleotide];

    if (!rnaNucleotide) {
      throw new Error('Invalid input DNA.');
    }

    rnaStrand += rnaNucleotide;
  }

  return rnaStrand;
};
