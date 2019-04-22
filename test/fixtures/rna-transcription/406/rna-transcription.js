export function toRna(dnaString) {
  let output = '';

  for (let i = 0; i < dnaString.length; i += 1) {
    switch (dnaString[i]) {
      case 'C':
        output += 'G';
        break;
      case 'G':
        output += 'C';
        break;
      case 'T':
        output += 'A';
        break;
      case 'A':
        output += 'U';
        break;
      case '':
        break;
      default:
        throw (new Error('Invalid input DNA.'));
    }
  }
  return output;
}
