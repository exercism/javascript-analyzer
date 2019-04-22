export const toRna = dna => {
    const validRegex = RegExp("^[ACGT]*$")

    if (!validRegex.test(dna)) {
        throw new Error('Invalid input DNA.')
    }

    const RNA = {
        'A': 'U',
        'C': 'G',
        'G': 'C',
        'T': 'A'
    }

    return dna.split('').map(x => RNA[x]).join('')
}