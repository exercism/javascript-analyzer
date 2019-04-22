function toRna(nseq = '') {
  var cdna = "", i = 0;

  while(i < nseq.length) {
    switch(nseq[i++]) {
      case 'A':
        cdna += 'U';

        break;
      case 'T':
        cdna += 'A';

        break;
      case 'G':
        cdna += 'C';

        break;
      case 'C':
        cdna += 'G';

        break;
      case 'U':
      default:
        throw new Error('Invalid input DNA.');

        break;
    }
  }

  return cdna;
} 

module.exports.toRna = toRna;
