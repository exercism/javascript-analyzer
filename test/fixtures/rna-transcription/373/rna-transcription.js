export const toRna = (dna) => {
  // Pair dna to rna
  const nucleotides = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
  }

  // Split dna from string to array
  dna = dna.split('')

  let rna = ''
  const nucleotidesToArr = Object.keys(nucleotides)

  // map char from dna to rna nucleotides
  dna.map(char => {
    rna += nucleotides[char]
  })

  // chars not in nucleotides are stored as undefined. Throw error for these
  // results
  if (rna.includes('undefined')) {
    throw new Error('Invalid input DNA.')
  }

  return rna
}
