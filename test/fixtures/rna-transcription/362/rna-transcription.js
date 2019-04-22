export function toRna(dnk) {
  const arrDnk = dnk.split('');
  const result = [];

  for (let i = 0; i < arrDnk.length; i++) {
    if (arrDnk[i] === 'T') {
      result.push('A');
    } else if (arrDnk[i] === 'G') {
      result.push('C');
    } else if (arrDnk[i] === 'C') {
      result.push('G');
    } else if (arrDnk[i] === 'A') {
      result.push('U');
    } else {
      throw new Error('Invalid input DNA.');
    }
  }
  return result.join('');
}
