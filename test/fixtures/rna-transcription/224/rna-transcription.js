const dnaToRnaBases = {
    'G': 'C',
    'C': 'G',
    'T': 'A',
    'A': 'U'
};

export function toRna(dnaBaseSequence) {
    let rnaBaseSequence = '';
    for (const dnaBase of dnaBaseSequence) {
        if (dnaToRnaBases[dnaBase] === undefined) {
            throw new Error('Invalid input DNA.');
        }
        rnaBaseSequence += dnaToRnaBases[dnaBase];
    }
    return rnaBaseSequence;
}



