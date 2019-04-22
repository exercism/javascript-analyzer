function nucleotidesSwitch(n) {
  if (n === 'G') return 'C';
  if (n === 'C') return 'G';
  if (n === 'T') return 'A';
  if (n === 'A') return 'U';
  if (n === '') return '';
  throw new Error('Invalid input DNA.');
}

export function toRna(dna) {
  return dna.split('').map(n => nucleotidesSwitch(n)).join('');
}
