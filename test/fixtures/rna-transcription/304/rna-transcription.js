const getMatching = (nucleotide) => {
  switch (nucleotide) {
    case 'G':
      return 'C';
    case 'C':
      return 'G';
    case 'T':
      return 'A';
    case 'A':
      return 'U';
    default:
      throw new Error('Invalid input DNA.');
  }
};

const toRna = nucleotide => nucleotide.split('').map(item => getMatching(item)).join('');

module.exports = { toRna };
