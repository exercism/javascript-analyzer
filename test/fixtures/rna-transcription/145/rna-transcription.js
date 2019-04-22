/**
 * Map of DNA nucleotides and their transcribed RNA complement.
 *
 * G -> C
 * C -> G
 * T -> A
 * A -> U
 *
 * @type {Map<string, string>}
 */
const nucleotideComplements = new Map([
  ['G', 'C'],
  ['C', 'G'],
  ['T', 'A'],
  ['A', 'U'],
]);

/**
 * Transcribes a given DNA strand into its RNA complement.
 *
 * @param {string} strand
 *
 * @return {string}
 */
export const toRna = strand => strand
  .split('')
  .map((nucleotide) => {
    const rnaComplement = nucleotideComplements.get(nucleotide);

    if (!rnaComplement) {
      throw new Error('Invalid input DNA.');
    }

    return rnaComplement;
  })
  .join('');
