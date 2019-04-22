export function toRna(dna) {
  const converter = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U',
  };
  if (dna.length < 1) return '';

  const dnaArray = dna.split('');

  return dnaArray.map((value) => {
    if (converter[value] === undefined) throw new Error('Invalid input DNA.');
    return converter[value];
  }).join('');
}
