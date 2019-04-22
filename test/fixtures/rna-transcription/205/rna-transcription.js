const toRna = rna => {
  if (typeof rna !== 'string') return 'Invalid input DNA.';
  rna = rna.replace(/[^gcta]/gi, '');
  if (!rna) return 'Invalid input DNA.';
  let result;
  for (letter of rna) {
    switch (letter) {
      case 'G':
        result += 'C'
      case 'C':
        result += 'G'
      case 'T':
        result += 'A'
      case 'A':
        result += 'U'
    }
    return result;
  }
};

console.log(toRna('ACGTGGTCTTAA'));

module.exports = {
  toRna
};