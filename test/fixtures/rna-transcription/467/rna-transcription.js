const transcribeChar = (c) => {
  if (c === 'G') return 'C';
  if (c === 'C') return 'G';
  if (c === 'T') return 'A';
  if (c === 'A') return 'U';
  else throw new Error('Invalid input DNA.');
}

export const toRna = (s) => {
  let res = '';
  for (let i = 0; i < s.length; i++) {
    res += transcribeChar(s[i]);
  }
  return res;
}