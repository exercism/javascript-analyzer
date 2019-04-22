export function toRna(strand) {
  const DNA = "GCTA";
  const RNA = "CGAU";
  const strandArray = strand.split('');
  if (strandArray.some(x => !DNA.includes(x))) {
    throw new Error('Invalid input DNA.');
  }
  return strandArray.map(x => RNA[DNA.indexOf(x)]).join('');
}