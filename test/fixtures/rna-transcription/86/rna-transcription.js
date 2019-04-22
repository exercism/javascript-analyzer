export const toRna = (dna, map = { G: 'C', C: 'G', T: 'A', A: 'U' }) => dna.split('').map(x => {
    if (x in map) return map[x]
    throw new Error("Invalid input DNA.")
}).join('');