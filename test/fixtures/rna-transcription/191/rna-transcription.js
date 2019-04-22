const DNA_RNA_MAPPING = {
  G: 'C',
  C: 'G',
  T: 'A',
  A: 'U',
};

function toRna(dna) {
  let result = '';

  // convert DNA Strand to array
  const dnaStrand = Array.from(dna);

  // loop over dna strand
  dnaStrand.forEach((n) => {
    if (Object.keys(DNA_RNA_MAPPING).includes(n)) {
      // if nucleotide is valid, add respective RNA nucleotide to result
      result += DNA_RNA_MAPPING[n];
    } else {
      // if nucleotide is invalid, throw Error
      throw new Error('Invalid input DNA.');
    }
  });

  return result;
}

module.exports = {
  toRna,
};
