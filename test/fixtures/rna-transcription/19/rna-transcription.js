export const toRna = (dna) => {
    let t = {
        'G' : 'C',
        'C' : 'G',
        'T' : 'A',
        'A' : 'U',
    }

    let rna = '';

    for (var i = 0; i < dna.length; i++) {
        let letter = dna.charAt(i);

        if(t[letter] == undefined) {
            throw new Error('Invalid input DNA.');
        }
        rna += t[letter];
    }

    return rna;
};
