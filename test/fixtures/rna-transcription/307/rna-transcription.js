const codon = {
  G: "C",
  C: "G",
  T: "A",
  A: "U"
}


export const toRna = (DNA) => {
  const result = [];
  for(let i = 0; i < DNA.length; i++) {
    if (!codon[DNA[i]]) {
      throw new Error('Invalid input DNA.');
    }
    result.push(codon[DNA[i]]);
  }
  return result.join('');
}