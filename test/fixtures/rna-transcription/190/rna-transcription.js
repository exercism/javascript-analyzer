export function toRna (dna) {
  return dna.split('').map(function (element) {
    switch (element) {
      case 'C':
        return 'G'
        break
      case 'G':
        return 'C'
        break
      case 'A':
        return 'U'
        break
      case 'T':
        return 'A'
        break
      default:
        throw Error('Invalid input DNA.')
    }
  }).join('')
}
