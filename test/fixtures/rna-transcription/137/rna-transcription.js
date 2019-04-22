export const toRna = (dna) => {
    let rna = "";
    let dict = {"G": "C", "C": "G", "A": "U", "T": "A"};
    for (let i of dna) {
        if (!dict[i]) {
            throw new Error('Invalid input DNA.');
        }
        rna += dict[i];
    }
    return rna;
};
