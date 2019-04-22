export function toRna(dnaString) {
  const regExp = new RegExp('[^GCTA]');
  if (regExp.test(dnaString)) {
    throw new Error('Invalid input DNA.');
  } else {
    return dnaString.split('').map((letter) => {
      if (letter === 'G') {
        return 'C';
      }
      if (letter === 'C') {
        return 'G';
      }
      if (letter === 'T') {
        return 'A';
      }
      if (letter === 'A') {
        return 'U';
      }
      return '';
    }).join('');
  }
}
