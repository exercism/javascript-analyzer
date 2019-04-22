const dna = {
  G: 'C', C: 'G', T: 'A', A: 'U',
};
let rna;
function getRna(input) {
  if (input.length === 0) {
    return;
  }
  for (let i = 0; i < input.length; i += 1) {
    rna += dna[input[i]];
  }
  return rna;
}
export const toRna = input => getRna(input);
