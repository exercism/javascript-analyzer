const dnaToRnaMap = new Map();
dnaToRnaMap.set('', '');
dnaToRnaMap.set('C', 'G');
dnaToRnaMap.set('G', 'C');
dnaToRnaMap.set('A', 'U');
dnaToRnaMap.set('T', 'A');

function processEach(dnaNucleotide) {
  if (dnaToRnaMap.get(dnaNucleotide)) {
    return dnaToRnaMap.get(dnaNucleotide);
  }
  throw new Error('Invalid input DNA.');
}

export function toRna(dna) {
  let rna = '';
  dna.split('')
    .forEach((dnaNucleotide) => {
      rna += processEach(dnaNucleotide);
    });
  return rna;
}
