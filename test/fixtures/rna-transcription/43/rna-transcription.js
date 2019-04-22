// rna-transcription implements the RNA Transcription programming exercise.
//
// Given an input string representing a DNA strand, return the string that
// would correspond to the translated RNA.

// toRna is an exported function object that performs the DNA => RNA translation.
export const toRna = (dna) => {
  // Build up our RNA string by enumerating the letters in the given DNA.
  let rna = '';
  for (let index = 0; index < dna.length; index += 1) {
    switch (dna.charAt(index)) {
      case 'C': rna += 'G'; break;
      case 'G': rna += 'C'; break;
      case 'A': rna += 'U'; break;
      case 'T': rna += 'A'; break;
      default: throw new Error('Invalid input DNA.');
    }
  }

  return rna;
};
