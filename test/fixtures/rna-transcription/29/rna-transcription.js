function getRnaComplement(nucl) {
    switch (nucl) {
        case 'C':
            return 'G';
        case 'G':
            return 'C';
        case 'A':
            return 'U';
        case 'T':
            return 'A';
        default:
            throw 'Invalid input DNA.';
    }
}

function toRna(dna) {
    let rna = '';
    for (let i in dna) {
        rna += getRnaComplement(dna[i]);
    }
    return rna;
}

module.exports = { toRna };
