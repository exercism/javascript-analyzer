export const toRna = (dna) => {
    let rna = '';
    for (let x = 0; x < dna.length; x++) {
        const nucleotide = dna[x];
        switch (nucleotide) {
            case 'G':
                rna = rna.concat('C');
            break;
            case 'C':
                rna = rna.concat('G');
            break;
            case 'T':
                rna = rna.concat('A');
            break;
            case 'A':
                rna = rna.concat('U');
            break;
            default:
                throw new Error('Invalid input DNA.');
            break;
        }
    }

    return rna;
}