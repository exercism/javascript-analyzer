const dnaRnaMap = {
    '': '',
    'C': 'G',
    'G': 'C',
    'A': 'U',
    'T': 'A'
}

export const toRna = (dna) => {
    if (dna.length === 1) {
        if (dnaRnaMap[dna] !== undefined) {
            return dnaRnaMap[dna]
        } else {
            throw new Error('Invalid input DNA.')
        }
    }

    return [...dna].map(toRna).join('')
}