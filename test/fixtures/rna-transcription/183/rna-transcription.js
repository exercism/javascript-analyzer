const elements = {
    CYTOSINE: 'C',
    GUANINE: 'G',
    ADENINE: 'A',
    URACIL: 'U',
    TYMINE: 'T'
}

export const toRna = (rnaSequence) => {
    let transcribedSequence = [];
    const arrayFromRnaSequence = [...rnaSequence];
    arrayFromRnaSequence.forEach(element => {
        const transcribedElement = transcribeRna(element);
        transcribedSequence = [...transcribedSequence, transcribedElement];
    });
    const rnaSequenceFromArray = transcribedSequence.join('');
    return rnaSequenceFromArray;
}

const transcribeRna = (rna) => {
    let transcribedRna;
    switch (rna) {
        case elements.CYTOSINE:
            transcribedRna = elements.GUANINE;
            break;
        case elements.GUANINE:
            transcribedRna = elements.CYTOSINE;
            break;
        case elements.ADENINE:
            transcribedRna = elements.URACIL;
            break;
        case elements.TYMINE:
            transcribedRna = elements.ADENINE;
            break;
        default:
            throw('Invalid input DNA.');
    }
    return transcribedRna;
}