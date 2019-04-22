export function toRna(str) {
  let dna = {
    'G': 'C',
    'C': 'G',
    'T': 'A',
    'A': 'U'
  };
  let dn = 'GCTUA'.split("");
  let newStr = '';
  for (let i = 0; i < str.length; i ++) {
    let letter = str[i];
    if (dna.hasOwnProperty(letter)) {
      newStr += dna[letter];
    }
    if (dn.indexOf(letter) === -1 || !dna.hasOwnProperty(letter)) {
      throw new Error('Invalid input DNA.');
    }
  }
  return newStr;
}
