export const toRna = (dnaArg) => {
  if (typeof dnaArg !== 'string') throw new Error('Please provide a string');
  if (!dnaArg) return '';

  const [...dnas] = dnaArg.toUpperCase();

  // check to make sure that valid keys are provided
  const isValid = dnas.every(dna => ['A', 'C', 'G', 'T'].includes(dna));
  if (!isValid) throw new Error('Invalid input DNA.');

  const dnaLibrary = new Map();
  dnaLibrary.set('G', 'C');
  dnaLibrary.set('C', 'G');
  dnaLibrary.set('T', 'A');
  dnaLibrary.set('A', 'U');

  return dnas.map(dna => dnaLibrary.get(dna)).join('');
};
