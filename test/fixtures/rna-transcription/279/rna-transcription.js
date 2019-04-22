export const toRna = (dnaString) => {
  dnaString = Array.from(dnaString);
  if (dnaString) {
    for (let i = 0; i < dnaString.length; i++) {
      switch (dnaString[i]) {
        case 'G':
          dnaString[i] = dnaString[i].replace(/G/, 'C');
          break;
        case 'C':
          dnaString[i] = dnaString[i].replace(/C/, 'G');
          break;
        case 'T':
          dnaString[i] = dnaString[i].replace(/T/, 'A');
          break;
        case 'A':
          dnaString[i] = dnaString[i].replace(/A/, 'U');
          break;
        default:
          throw new Error('Invalid input DNA.');
      }
    }
  } else return '';
  return dnaString.join('');
};
