export const toRna = (str) => {
  // Creating a new variable to hold the RNA string.
  let rnaStr = '';

  // Looping through the given DNA string.
  for (let i = 0; i < str.length; i++) {
    // Switch statement converting given nucleotide with its complement.
    switch(str[i]) {
    case 'G':
      rnaStr += 'C';
      break;
    case 'C':
      rnaStr += 'G';
      break;
    case 'T':
      rnaStr += 'A';
      break;
    case 'A':
      rnaStr += 'U';
      break;
    // Default behavior is to throw an error, since the input most likely is incorrect.
    default:
      throw new Error('Invalid input DNA.');
    }
  }

  // Return the RNA string.
  return rnaStr;
}