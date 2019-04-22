export function toRna(dna) {
    var rna = '';

    if (dna && typeof dna === 'string') {
        dna.toUpperCase();
    }

    [...dna].forEach(c => {
        switch (c) {
            case 'C':
                rna += 'G';
                break;
            case 'G':
                rna += 'C';
                break;
            case 'A':
                rna += 'U';
                break;
            case 'T':
                rna += 'A';
                break;
            default:
                throw new Error('Invalid input DNA.');
        }
    });
    return rna;
}