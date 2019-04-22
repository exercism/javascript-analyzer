export function toRna(dna) {
    let rna = '';
    let nucleotides = {'G': 'C', 'C': 'G', 'T': 'A', 'A': 'U'};

    for (let i = 0; i < dna.length; i++) {
        let c = dna.charAt(i);
        if (nucleotides.hasOwnProperty(c)) {
            rna += nucleotides[c];
        } else {
            throw new Error("Invalid input DNA.");
        }
    }

    return rna;
}
