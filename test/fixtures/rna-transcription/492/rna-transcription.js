export const toRna = (dna) => {
  if(/[GCTA]/.test(dna) || dna === ""){
    var rna = dna;
    rna = rna.replace(/C/g,"C-").replace(/A/g,"U").replace(/T/g,"A").replace(/G/g,"C").replace(/C-/g,"G");
    return rna;
  } else {
      throw new Error('[Error: Invalid input DNA.]')
  }
}
