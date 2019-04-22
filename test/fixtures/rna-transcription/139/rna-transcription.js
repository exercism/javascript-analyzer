const toRna = dna => {
  const table = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
  }

  let RNA = dna.split('').map(i => table[i])
  if (RNA.indexOf(undefined) !== -1) throw new Error('Invalid input DNA.')

  return RNA.join('')
}

export { toRna }
