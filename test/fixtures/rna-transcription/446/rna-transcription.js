export const toRna = (str) => {
  if (!str.length) {
    return '';
  }
  
  
  
  str = str.toLowerCase()
  let splitRna = str.split('');
  let rna = splitRna.map(letter => {
    if (letter == 'g') {
      return 'C'
    } else if (letter == 'c') {
      return 'G'
    } else if (letter == 't') {
      return 'A'
    } else if (letter == 'a') {
      return 'U'
    } else {
      throw new Error('Invalid input DNA.')
    }
  })



  rna = rna.join('')

  return rna;
}