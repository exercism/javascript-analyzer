export function toRna(dna) {
  const dnaArr = dna.split('');
  const rna = [];
  for (let i = 0; i < dnaArr.length; i += 1) {
    switch (dnaArr[i]) {
      case 'G':
        rna.push('C');
        break;
      case 'C':
        rna.push('G');
        break;
      case 'T':
        rna.push('A');
        break;
      case 'A':
        rna.push('U');
        break;
      default:
        throw new Error('Invalid input DNA.');
    }
  }
  return rna.join('');
}
