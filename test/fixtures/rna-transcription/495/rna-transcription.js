export const toRna = (dna) => {
    let rna = '';
    let i;
    for (i = 0; i < dna.length; i += 1) {
        switch (dna.charAt(i)) {
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
                throw 'Invalid input DNA.';
        }
    }
    return rna;
};
