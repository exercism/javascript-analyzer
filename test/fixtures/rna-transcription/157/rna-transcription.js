export const toRna = (dna) => {
  let rna = [];

  for(let i=0; i < dna.length; i++) {
    let symbol = dna[i];
    if (symbol !== 'G' && symbol !== 'C' && symbol !== 'T' && symbol !== 'A' && symbol !== '') {
      throw new Error('Invalid input DNA.');
    } else if (symbol === '') {
      rna.push('');
    } else if (symbol === 'G') {
      rna.push('C');
    } else if (symbol === 'C') {
      rna.push('G');
    } else if (symbol === 'T') {
      rna.push('A');
    } else if (symbol === 'A') {
      rna.push('U');
    }
  }
  return rna.join('');
};
