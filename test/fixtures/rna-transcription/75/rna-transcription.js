export const toRna = (dna) => {
    const TRANS = {
        "G": "C",
        "C": "G",
        "T": "A",
        "A": "U",
    };
    return dna.replace(/./g, function (a) {
        if (TRANS[a]) {
            return TRANS[a];
        }
        throw new Error('Invalid input DNA.');
    });
}
