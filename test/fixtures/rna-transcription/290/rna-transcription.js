function toRna (dna){

  var rna = '';

  for (let i = 0; i < dna.length; i++) {
    let char = dna.charAt(i);

    switch (char) {
      case 'G': 
        char = 'C';
        break;
      case 'C':
        char = 'G';
        break;
      case 'T':
        char = 'A';
        break;
      case 'A':
        char = 'U';
        break;
      default:
        throw (new Error('Invalid input DNA.'));
    } 

    rna += char;
  }

  return rna;
}

module.exports = {
  toRna: toRna,
};
