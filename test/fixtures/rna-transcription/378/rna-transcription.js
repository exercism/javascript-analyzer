export const toRna = (input) => {

  const transcription = {
    'C': 'G',
    'G': 'C',
    'A': 'U',
    'T': 'A'
  }

  const translate = (el) => {
    if (transcription[el]) {
      return transcription[el]
    } else {
      throw "Invalid input DNA.";
    }
  }

  return input.split('').map( el => translate(el) ).join('')
}
