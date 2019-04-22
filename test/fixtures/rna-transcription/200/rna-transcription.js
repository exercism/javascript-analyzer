export const toRna = sequence => {

  if (!sequence) return sequence

  const convertNucleotides = nucleotide => {
    
    if (nucleotide === 'G') return 'C'
    if (nucleotide === 'C') return 'G'
    if (nucleotide === 'T') return 'A'
    if (nucleotide === 'A') return 'U'

    throw new Error('Invalid input DNA.')
  }

  const answer = sequence
    .split('')
    .map(convertNucleotides)
    .join('')

  return answer
}
