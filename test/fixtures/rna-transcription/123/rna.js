export const toRna = (text) => {

  const guanine = 'G';
  const cytosine = 'C';
  const thymine = 'T';
  const adenine = 'A';
  const uracil = 'U';

  let complement = '';
  for ( let i = 0; i < text.length; i++) {
    switch (text.charAt(i)) { // Stronger version of IF statement
      case guanine : // if the i of text equal to guanine
        complement = complement + cytosine; // return the '' and G
        break; // finish it
      case cytosine :
        complement = complement + guanine;
        break;
      case thymine :
        complement = complement + adenine;
        break;
      case adenine :
        complement = complement + uracil;
        break;
      default : // else
        throw 'Invalid input DNA.'; // return 'xxxxxx'. BUT it you only use throw and default to show an error. //
    }
  }
  return complement;
};
