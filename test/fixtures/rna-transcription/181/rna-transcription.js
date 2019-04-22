export const toRna = (letter) => {
  const myArray = ["A", "T", "C", "G"]
  if (letter.length === 0) {
    return '';
  }
  let rnaFinal = [];
  for (let index = 0; index < letter.length; index++) {
    // if(myArray.indexOf(letter[index]) !== -1){
      let letters = letter[index]
      switch (letters) {
        case 'A':
          rnaFinal.push('U');
          break;
        case 'T':
          rnaFinal.push('A');
          break;
        case 'C':
          rnaFinal.push('G');
          break;
        case 'G':
          rnaFinal.push('C');
          break;
        default:
          throw "Invalid input DNA.";
      }
    // }
  }
  return rnaFinal.join('');
};


