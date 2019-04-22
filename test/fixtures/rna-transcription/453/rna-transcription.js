export const toRna = input => {

  const key = letter => {
    if (letter == 'G') {
      return 'C'
    } else if (letter == 'C') {
      return 'G'
    } else if (letter == 'T') {
      return 'A'
    } else if (letter == 'A') {
      return 'U'
    } else if (letter == '') {
      return ''
    } else {
      return 'Invalid input DNA.'
    }
  }

  let newString = ''

  if (input.length > 1) {
    const letters = input.split('')
    const rnaArray = letters.map(l => key(l))
    rnaArray.includes('Invalid input DNA.') ? 
    newString = 'Invalid input DNA.' :
    newString = rnaArray.join('')
  } else {
    newString = key(input)
  }

  if (newString == 'Invalid input DNA.') {
    throw Error('Invalid input DNA.')
  } else {
  return newString
  }

}