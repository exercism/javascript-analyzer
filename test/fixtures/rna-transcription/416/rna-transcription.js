const complement = new Map([['G', 'C'], ['C', 'G'], ['T', 'A'], ['A', 'U']]);

export const toRna = (dna) => {
    let rna = [];
    for (let nucleotide of dna) {
        let transcribed = complement.get(nucleotide);
        if (transcribed === undefined) {
            throw new Error('Invalid input DNA.');
        }
        rna.push(transcribed);
    }
    return rna.join('');
}