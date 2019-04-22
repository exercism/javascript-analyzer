//
// This file defines a function that transcribes a DNA string to RNA.

const dnaComplements = {
  'G': 'C',
  'C': 'G',
  'T': 'A',
  'A': 'U'
}

export const toRna = (input) => {
  return input.split('').map((dnaChar) => {
    if (!dnaComplements.hasOwnProperty(dnaChar)) {
      throw new Error('Invalid input DNA.');
    }
    return dnaComplements[dnaChar];
  }).join("");
}
