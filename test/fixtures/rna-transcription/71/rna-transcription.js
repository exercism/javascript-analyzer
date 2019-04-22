export const toRna = dna => {
  // make the dna sequence iterable by turning it into an array
  // with .split method
  let rna = dna.split("").map(
    // map over each nucleotide of the sequence
    nucleotide => {
      // evaluate/change each nucleotide using switch statement
      // throw error in case of invalid input
      switch (nucleotide) {
        case 'G': 
          return 'C';
        case 'C':
          return 'G';
        case 'T':
          return 'A';
        case 'A':
          return 'U';
        default:
          throw new Error('Invalid input DNA.');
      }
    })
    // combine all nucleotides to one array element
    .join("")
    // turn the array into a string
    .toString();
  return rna;
}