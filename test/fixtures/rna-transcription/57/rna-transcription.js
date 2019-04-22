export const toRna = (dna) => {
    let rna = [];
    dna.split('').map(strand => {
        if (strand === '') {
            rna.push('');
            return;
        } else if (strand === 'G') {
            rna.push('C');
        } else if (strand === 'C') {
            rna.push('G');
        } else if (strand === 'T') {
            rna.push('A')
        } else if (strand === 'A') {
            rna.push('U');
        } else {
            throw Error('Invalid input DNA.');
        }
    });
    return rna.join('');
};