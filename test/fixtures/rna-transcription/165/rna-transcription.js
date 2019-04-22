

function toRna(strand) {
  return strand.split('')
    .map((nucleotide) => {
      if (nucleotide === 'C') return 'G';
      if (nucleotide === 'G') return 'C';
      if (nucleotide === 'T') return 'A';
      if (nucleotide === 'A') return 'U';
      throw new Error('Invalid input DNA.');
    })
    .join('');
}

export { toRna };
