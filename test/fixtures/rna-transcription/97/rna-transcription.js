export const toRna = strand => {
  const complements = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
  };

  var transcribedSequence = strand.split('').map(function(nucleotide) {
    if (typeof complements[nucleotide] !== 'undefined') {
      return complements[nucleotide];
    } else {
      throw Error('Invalid input DNA.');
    }
  });

  return strand.length === 0 ? '' : transcribedSequence.join('');
};
