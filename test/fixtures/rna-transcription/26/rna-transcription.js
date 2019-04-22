export const toRna = (dna) => {
  for(let i = 0;i < dna.length;i++) {
    if ((/[GCTA]/).test(dna[i]) == false)
      throw new Error('Invalid input DNA.');
  }
  let dnaToRna = new Object();
  dnaToRna['G'] = 'C';
  dnaToRna['C'] = 'G';
  dnaToRna['T'] = 'A';
  dnaToRna['A'] = 'U';
  let rna = "";
  for(let i = 0; i < dna.length;i++) {
    rna += dnaToRna[dna[i]];
  }
  return rna;
}
