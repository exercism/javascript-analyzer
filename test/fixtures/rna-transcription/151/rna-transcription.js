export const toRna = dna => transformNucleotides(dna).join('')

const transformNucleotides = dna => dna.split('').map(nucleotide => {
  return transformNucleotide(nucleotide)
})

const transformNucleotide = nucleotide => {
  switch (nucleotide) {
    case 'A':
      return 'U'
      break
    case 'T':
      return 'A'
      break
    case 'G':
      return 'C'
      break
    case 'C':
      return 'G'
      break
    default:
      throw new Error('Invalid input DNA.')
  }
}