const complements = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

const nucleotideMapper = (nucleotide) => {
  if (!Object.keys(complements).includes(nucleotide)) {
    throw new Error('Invalid input DNA.');
  }

  return complements[nucleotide];
};

const toRna = sequence => sequence.split('').map(nucleotideMapper).join('');

export { toRna };
