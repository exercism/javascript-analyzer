/*
Given a DNA strand, return its RNA complement (per RNA transcription).
Both DNA and RNA strands are a sequence of nucleotides.
The four nucleotides found in DNA are
* adenine (A), cytosine (C), guanine (G) and thymine (T).
The four nucleotides found in RNA are
* adenine (A), cytosine (C), guanine (G) and uracil (U).
Given a DNA strand,
its transcribed RNA strand is formed by replacing each nucleotide with its complement:
G -> C
C -> G
T -> A
A -> U
*/


export const toRna = (str) => {
  if (typeof str !== 'string') throw new Error('Invalid input DNA.');

  if (str.length < 1) return str;

  return str.replace(/./g, (match) => {
    if (match === 'C') {
      return 'G';
    }
    if (match === 'G') {
      return 'C';
    }
    if (match === 'A') {
      return 'U';
    }
    if (match === 'T') {
      return 'A';
    }

    throw new Error('Invalid input DNA.');
  });
};
