export const toRna = (string) => {
  let newstring = '';
  let i;
  for (i = 0; i < string.length; i += 1) {
    if (string.charAt(i) === 'G') {
      newstring += 'C';
    } else if (string.charAt(i) === 'C') {
      newstring += 'G';
    } else if (string.charAt(i) === 'T') {
      newstring += 'A';
    } else if (string.charAt(i) === 'A') {
      newstring += 'U';
    } else {
      throw new Error('Invalid input DNA.');
    }
  }
  return newstring;
};
