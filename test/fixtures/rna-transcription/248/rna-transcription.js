// ------------------switch and splice()---------------------------
export const toRna = (dna) => {
  var trRna = [];
  var rna = ['C', 'G', 'A', 'U'];
  var l = dna.length;
  var arrayDna = dna.split('')

  for (var i = 0; i < l; i++) {
    switch (arrayDna[i]) {
      case "C":
        arrayDna.splice(i, 1, rna[1]);
        break;
      case "G":
        arrayDna.splice(i, 1, rna[0]);
        break;
      case "T":
        arrayDna.splice(i, 1, rna[2]);
        break;
      case "A":
        arrayDna.splice(i, 1, rna[3]);
        break;
      default:
        throw new Error('Invalid input DNA.');
    }
  }
  trRna = arrayDna;
  return trRna.join('');
}