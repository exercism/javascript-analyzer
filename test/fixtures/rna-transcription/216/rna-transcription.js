const COMPLEMENTDNA = {
    G: "C",
    C: "G",
    T: "A",
    A: "U"
};

export function toRna(dna) {
    let rna = "";

    for (var i = 0; i < dna.length; i++) {
        if (!COMPLEMENTDNA[dna.charAt(i).toString()]) {
            throw new Error("Invalid input DNA.");
        }
        rna = rna.concat(COMPLEMENTDNA[dna.charAt(i).toString()]);
    }

    return rna;
}
