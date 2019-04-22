export const toRna = (string) => {
  return string.split('').map((letter) => {
    if (letter === 'G') return 'C';
    if (letter === 'C') return 'G';
    if (letter === 'T') return 'A';
    if (letter === 'A') return 'U';
    throw Error('Invalid input DNA.');
  }).join('');
};
