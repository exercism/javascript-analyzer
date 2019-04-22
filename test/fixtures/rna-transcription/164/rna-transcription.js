
export const toRna = (dna) => {
    var rnaStrand = "";
    for (const c of dna) {
        rnaStrand += getRnaNucleotide(c);
    };
    return rnaStrand;
}

const getRnaNucleotide = (dnaNucl) => {
    var dnaToRna = {
        'G': 'C',
        'C': 'G',
        'T': 'A',
        'A': 'U'
    };
    const rnaNucl = dnaToRna[dnaNucl];
    if (rnaNucl === undefined) {
        throw new Error('Invalid input DNA.');
    }
    return rnaNucl;
}