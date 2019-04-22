export const toRna = (dna) => {
    var rnastr = '';
    for (var i = 0; i < dna.length; i++) {

        if (dna[i] == 'C') {
            rnastr += 'G';
        } else if (dna[i] == 'G') {
            rnastr += 'C';
        } else if (dna[i] == 'A') {
            rnastr += 'U';
        } else if (dna[i] == 'T') {
            rnastr += 'A';
        } else {
            throw new Error('Invalid input DNA.');
        };
    };
    return rnastr;
};