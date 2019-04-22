const DNA_TO_RNA = {
    'G': 'C',
    'C': 'G',
    'T': 'A',
    'A': 'U'
}
function toRna(dna) {
    const arrayOfDna = dna.split("")
    const arrayOfRna = arrayOfDna.map(char => {
        if (char in DNA_TO_RNA) {
            return DNA_TO_RNA[char];
        } else {
            throw new Error('Invalid input DNA.')
        }
    })
    return arrayOfRna.join("")
}

export {toRna}; 