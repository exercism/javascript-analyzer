export const toRna = dna => {
  if (dna === '')
    return dna
  if (dna.length === 1)
    return transform(dna)
  if (dna.length > 1)
    return dna.split('').map(x => transform(x)).join('')
}

const transform = dna => {
  if (dna === 'G')
    return 'C'
  if (dna === 'C')
    return 'G'
  if (dna === 'T')
    return 'A'
  if (dna === 'A')
    return 'U'
  else
    throw new Error('Invalid input DNA.')
}
