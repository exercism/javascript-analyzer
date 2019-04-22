export const toRna = (text) => {
  const dna = ['C', 'G', 'A', 'T'];
  const rna = ['G', 'C', 'U', 'A'];

  let output = '';

  for (let i = 0; i < text.length; i++) {
const dnaLetter = text[i];
const indexInRna = dna.indexOf(dnaLetter);
if (indexInRna === -1) {
  throw new Error('Invalid input DNA.');
}
output = output + rna[indexInRna];
  }
  return output;
};
