export const toRna = (dna) => {
  const lookupTable = {
    'C': 'G',
    'G': 'C',
    'A': 'U',
    'T': 'A'
  };

  return dna
    .split('')
    .map(x => {
      if (lookupTable.hasOwnProperty(x)) {
        return lookupTable[x];
      } else {
        throw new Error('Invalid input DNA.');
      }
    })
    .join('');
}
