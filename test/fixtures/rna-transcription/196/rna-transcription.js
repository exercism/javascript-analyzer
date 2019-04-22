/**
 * @param {String} dnaSequence some given sequence of DnA in string format
 * @returns {String} an RnA sequence in string format
 * 
 * Transcribes a DnA sequence to an RnA one
 */
export const toRna = dnaSequence => {
    return Array.prototype.map.call(dnaSequence, transcribeNucleotide).join("")
}

/**
 * @param {char} character some given character
 * @returns {char} DnA -> RnA transcription of the given character 
 * @throws {Error} Invalid input DNA if the input contains illegal characters
 * 
 * Convert a single DnA nucleotide to an RnA one
 */
const transcribeNucleotide = character => {
    const invalidDnaError = new Error('Invalid input DNA.')
    switch(character) {
        case 'C': return 'G'
        case 'G': return 'C'
        case 'A': return 'U'
        case 'T': return 'A'
        case 'U': 
        case 'X': throw(invalidDnaError)
        default: return character
    }
}