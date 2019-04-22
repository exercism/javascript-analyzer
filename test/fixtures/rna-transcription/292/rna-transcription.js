const transcriptions = { 'A': 'U', 'C': 'G', 'G': 'C', 'T': 'A' }

export const toRna = dna => {
    if (new RegExp('[^ACGT]').exec(dna)) {
        throw Error('Invalid input DNA.')
    }
    return dna.replace(/[ACGT]/g, nucleotide => transcriptions[nucleotide])
}