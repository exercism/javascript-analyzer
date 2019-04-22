export const toRna = (dnaString) => {
  const dnaArray = dnaString.split('');
  const rnaArray = [];

  const transcribe = (element) => {
    if (element === 'C') rnaArray.push('G');
    if (element === 'G') rnaArray.push('C');
    if (element === 'A') rnaArray.push('U');
    if (element === 'T') rnaArray.push('A');
  };

  const isValidDna = currentValue => currentValue === 'C' || currentValue === 'G' || currentValue === 'A' || currentValue === 'T';

  if (dnaArray.every(isValidDna)) {
    dnaArray.forEach(transcribe);
    const rnaString = rnaArray.join('');
    return rnaString;
  }
  throw new Error('Invalid input DNA.');
};
