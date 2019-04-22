const nucleotideCorrespondences = new Map([
  ['C', 'G'],
  ['G', 'C'],
  ['A', 'U'],
  ['T', 'A'],
]);

export function toRna(dna) {
  return dna.split('').map((nucleotide) => {
    if (nucleotideCorrespondences.has(nucleotide)) {
      return nucleotideCorrespondences.get(nucleotide);
    }
    throw new Error('Invalid input DNA.');
  }).join('');
}
