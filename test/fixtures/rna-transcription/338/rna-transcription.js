const rnaMapping = {
    "G": "C",
    "C": "G",
    "T": "A",
    "A": "U"
};
export function toRna(dnaStrand) {
    return Array.from(dnaStrand).map((nucleotide) => {
        if(!rnaMapping[nucleotide]) {
            throw new Error("Invalid input DNA.")
        }
        return rnaMapping[nucleotide];
    }).join("");
}