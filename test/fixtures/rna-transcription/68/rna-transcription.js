function isValidStrand(strand) {
  return strand.match('^[ATGC]+$');
}

export function toRna(strand) {
  if (strand === '') return strand;

  if (!isValidStrand(strand)) {
    throw new Error('Invalid input DNA.');
  }

  return strand
    .replace(/G/g, '_')
    .replace(/C/g, 'G')
    .replace(/A/g, 'U')
    .replace(/T/g, 'A')
    .replace(/_/g, 'C');
}
