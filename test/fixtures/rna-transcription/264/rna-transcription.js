exports.toRna = function (dna) {
    var mapping = {
        G: 'C',
        C: 'G',
        T: 'A',
        A: 'U'
    };

    var rna = new String();

    for (var i = 0; i < dna.length; i++) {
        if (mapping[dna[i]]) {
            rna += mapping[dna[i]];
        } else {
            throw Error('Invalid input DNA.');
        }
    }

    return rna;
};