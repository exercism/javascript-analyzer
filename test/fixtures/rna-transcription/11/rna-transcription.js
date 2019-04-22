function toRna(strand) {
  const dict = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };

  const nucleotids = strand.split('');

  if (!nucleotids.every(nucleotid => nucleotid in dict)) {
    throw new Error('Invalid input DNA.');
  }

  return nucleotids.map(nucleotid => dict[nucleotid]).join('');
}

export { toRna };
