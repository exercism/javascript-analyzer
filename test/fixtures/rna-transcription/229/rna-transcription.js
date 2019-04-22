const complements = {
    G: "C",
    C: "G",
    T: "A",
    A: "U"
};

export function toRna(DNA) {
    if (/[^GCTA]/.test(DNA)) {
        throw new Error("Invalid input DNA.");
    }

    return DNA.replace(/(\w)/g, nucleotide => complements[nucleotide]);
}
