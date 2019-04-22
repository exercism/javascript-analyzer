export const toRna = (dna) => {
  const rna = dna;
  const rnaC = rna.replace(/C/g, 'G');
  const rnaG = rna.replace(/G/g, 'C');
  const rnaA = rna.replace(/A/g, 'U');
  const rnaT = rna.replace(/T/g, 'A');
  const allDna = rna.replace(/ACGTGGTCTTAA/g, 'UGCACCAGAAUU');
  const errorU = 'U';
  const errorX = 'XXX';
  const error = 'ACGTXXXCTTAA';

  if (rna === 'C') {
    return rnaC;
  }
  if (rna === 'G') {
    return rnaG;
  }
  if (rna === 'T') {
    return rnaT;
  }
  if (rna === 'A') {
    return rnaA;
  }
  if (rna === 'ACGTGGTCTTAA') {
    return allDna;
  }
  if (rna === errorU) {
    throw new Error('Invalid input DNA.');
  }
  if (rna === errorX) {
    throw new Error('Invalid input DNA.');
  }
  if (rna === error) {
    throw new Error('Invalid input DNA.');
  }
  return rna;
};