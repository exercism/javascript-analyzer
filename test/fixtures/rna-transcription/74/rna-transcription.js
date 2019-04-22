export const toRna = (sequence) => {
  const complements = {
    'G': 'C',
    'C': 'G',
    'T': 'A',
    'A': 'U',
  };
  return sequence.split('').map((nucleotide) => {
    if (complements[nucleotide] === undefined) {
      throw Error('Invalid input DNA.');
    }
    return complements[nucleotide];
  }).join('');
}
