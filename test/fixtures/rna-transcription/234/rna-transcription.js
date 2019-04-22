const nucleotidesMap = new Map([
    ['G', 'C'],
    ['C', 'G'],
    ['T', 'A'],
    ['A', 'U'],
])

const transcribeNucleotide = n => nucleotidesMap.get(n)

const isDna = dna => dna.match(/^[GCTA]*$/)

export const toRna = dna => {
    
    if (!isDna(dna)) throw new Error('Invalid input DNA.')
    
    return dna
    .split('')
    .map(transcribeNucleotide)
    .join('')
    
} 