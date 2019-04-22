export const toRna = (dna) => {
  if (dna.length == 0) return '';
  //if (!dna) return new Error('Invalid input DNA.');
  let rnaMap = { 'C': 'G', 'G': 'C', 'T':'A', 'A':'U' };

  return dna.split('').map(dna => {
    let rna = rnaMap[dna];
    if (!rna) throw new Error('Invalid input DNA.');
    else return rna;
  }
    ).join('');
}