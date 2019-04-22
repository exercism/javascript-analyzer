const allowedChars = ['A', 'T', 'G', 'C'];

const isDnaValid = dna =>
  dna.split('').every(char => allowedChars.includes(char));

export const toRna = dna => {
  if (!isDnaValid(dna)) {
    throw new Error('Invalid input DNA.');
  }
  // replacing G with X temporarily, to avoid conflicts with C
  return dna
    .replace(/A/g, 'U')
    .replace(/T/g, 'A')
    .replace(/G/g, 'X')
    .replace(/C/g, 'G')
    .replace(/X/g, 'C');
};
