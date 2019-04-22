
export const toRna  = (dna) => {

  var theRna = '';

  if (!(dna.length == 0) && typeof dna == 'string'){
    for (var i = 0; i < dna.length; i++) {
      var letter = dna[i];

      if (letter == 'G') {
        letter = 'C';
      } else if (letter == 'C') {
        letter = 'G';
      } else if (letter == 'T') {
        letter = 'A';
      } else if (letter == 'A') {
        letter = 'U';
      } else {
        throw 'Invalid input DNA.';
      }

      theRna = theRna.concat(letter);
    }
  } else if (dna.length == 0 && typeof dna == 'string'){
    return "";
  }

  return theRna;
};
