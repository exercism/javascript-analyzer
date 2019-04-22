/**
 * Given a DNA strand, its transcribed RNA strand is formed by replacing each nucleotide with its complement.
 * @type {object} Dictionary
 */
const dic = { G: 'C', C: 'G', T: 'A', A: 'U' };

/**
 * Given a DNA strand, return its RNA complement (per RNA transcription).
 * @params {string}
 */
const toRna = dna =>
  dna
    .split('')
    .map(l => {
      if (dic[l]) return dic[l];
      throw new Error('Invalid input DNA.');
    })
    .join('');

export { toRna };
