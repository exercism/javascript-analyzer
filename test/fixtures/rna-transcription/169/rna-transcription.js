export const toRna = dna => {
    const dnaArray = Array.from(dna);
    return dnaArray.map( d => getTranscribedRNA(d)).join('')
}

const getTranscribedRNA = dna => {
    switch(dna.toUpperCase()) {
        case 'G':
            return 'C';
        case 'C':
            return 'G';
        case 'T':
            return 'A'
        case 'A':
            return 'U';
        default:
            throw new Error('Invalid input DNA.');
    }
}