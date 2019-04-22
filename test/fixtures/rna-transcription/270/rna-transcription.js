export const toRna = (dna) => {
    let transcriber = {
        'G': 'C',
        'C': 'G',
        'T': 'A',
        'A': 'U'
    }

    let result = ''
    for (let i = 0; i < dna.length; i++) {
        let curr = dna[i]
        let transcribed = transcriber[curr]
        if (!transcribed) {
            throw "Invalid input DNA."
        }
        
        result += transcribed
    }
    return result
}