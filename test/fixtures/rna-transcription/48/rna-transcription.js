export function toRna(dna) {
  let rna = dna;
  if (rna.includes('U') ||rna.includes('X') ){
  throw new Error('Invalid input DNA.');
  } else {
    rna = rna.replace(/C/g,"g");
    rna = rna.replace(/G/g,"c");
    rna = rna.replace(/A/g,"u");
    rna = rna.replace(/T/g,"a");
    return rna = rna.toUpperCase();
  }
}
