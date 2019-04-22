const DnaTranscriber = function() {};

DnaTranscriber.prototype.toRna = function(dna) {
    const map = {
        C: 'G',
        G: 'C',
        A: 'U',
        T: 'A'
    };

    if (!dna.match(/^[ACTG]+$/)) {
        throw new Error('Invalid input DNA.')
    } else {
        return dna.replace(/[CGAT]/g, function (nuc) {
            return map[nuc];
        })
    }

};

module.exports = DnaTranscriber;