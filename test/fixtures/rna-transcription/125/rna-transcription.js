export const toRna = dnaString => [...dnaString].map(transcribeToRna).join('');

function transcribeToRna(dna) {
  const DnaRnaMap = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };

  if (DnaRnaMap.hasOwnProperty(dna)) {
    return DnaRnaMap[dna];
  }
  throw Error('Invalid input DNA.');
}
