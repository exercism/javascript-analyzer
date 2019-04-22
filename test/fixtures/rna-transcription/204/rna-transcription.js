let TRANS = { G: 'C', C: 'G', T: 'A', A: 'U' }
let trans = e => {
    if (!TRANS.hasOwnProperty(e)) throw new Error('Invalid input DNA.')
    return TRANS[e]
}
export const toRna = dna => [...dna].map(trans).join('')