const rnaHash = {
    G: 'C',
    C: 'G',
    T: 'A',
    A: 'U'
};

export const toRna = dnaString => {
    if (dnaString === '') {
        return '';
    }

    return dnaString.split('')
        .map(dna => {
            const rna = rnaHash[dna];

            if (rna) {
                return rna;
            }

            throw new Error('Invalid input DNA.');
        }).join('');
}
