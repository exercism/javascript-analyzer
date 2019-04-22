const translation = {
  A: 'U',
  T: 'A',
  C: 'G',
  G: 'C',
};

const translationNucleotide = (nucleotide) => {
  if (!translation[nucleotide]) {
    throw new Error('Invalid input DNA.');
  } else {
    return translation[nucleotide];
  }
};

export const toRna = strand => strand.split('').map(translationNucleotide).join('');
