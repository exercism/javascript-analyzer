export const toRna = (rna) => {
  const rnaKey = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
  }

  let newStrand = ''

  rna.split('').forEach((e) => {
    if (e.toUpperCase() !== 'G' && e.toUpperCase() !== 'C' && e.toUpperCase() !== 'T' && e.toUpperCase() !== 'A') {
      throw new Error('Invalid input DNA.')
    }
    newStrand += rnaKey[e.toUpperCase()]
  })

  return newStrand
}