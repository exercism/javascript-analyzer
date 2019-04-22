const RNA_TRANSLATOR = {
    'G': 'C',
    'C': 'G',
    'T': 'A',
    'A': 'U'
}

export function toRna(dnaSequence) {
    let rnaSequence = ""
    for (let dnaLetter of dnaSequence) {
        let rnaValue = RNA_TRANSLATOR[dnaLetter];
        
        if (rnaValue === undefined){
            throw "Invalid input DNA.";
        } else {
            rnaSequence += RNA_TRANSLATOR[dnaLetter];
        }
    }
    return rnaSequence;
}