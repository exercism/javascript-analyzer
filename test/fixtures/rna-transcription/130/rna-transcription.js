/*
  toRna takes a DNA sequence as a string and returns its RNA compliment
  obj nucleotides is the map from DNA to RNA
*/

var nucleotides = {
  'G': 'C',
  'C': 'G',
  'T': 'A',
  'A': 'U'
}

export function toRna(dna) {
  var rna = new String;
  for (const char of dna.toUpperCase()) {
    if (char in nucleotides) {
      rna += nucleotides[char];
    } else {
      throw 'Invalid input DNA.';
    }
  }
  return rna;
}
