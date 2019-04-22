export const toRna = dna => dna.split('').reduce((result, char) => {
    switch (char) {
        case 'G': result += 'C'; break
        case 'C': result += 'G'; break
        case 'T': result += 'A'; break
        case 'A': result += 'U'; break
        default: throw new Error('Invalid input DNA.')
    }
    return result
}, '')