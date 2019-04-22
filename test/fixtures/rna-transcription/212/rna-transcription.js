const COMPLIMENTS = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

const rnaCompliment = (dnaNucleotide) => {
  const rnaNucleotide = COMPLIMENTS[dnaNucleotide];
  if (rnaNucleotide === undefined) {
    throw new Error('Invalid input DNA.');
  } else {
    return rnaNucleotide;
  }
};

const toRna = dnaStrand => [...dnaStrand].map(rnaCompliment).join('');

export { toRna };
