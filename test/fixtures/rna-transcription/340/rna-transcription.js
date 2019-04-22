export const toRna = function(dna) {
    let rna = [];
    dna = dna.split("");
    dna.forEach( nuc => {
        if (nuc === 'G') {
            rna.push('C');
        } else if (nuc === 'C') {
            rna.push('G');
        } else if (nuc === 'T') {
            rna.push('A');
        } else if (nuc === 'A') {
            rna.push('U');
        } else {
            throw new Error("Invalid input DNA.");
        }
    });
    return rna.join("");
}

// console.log(toRna("ACGTGGTCTTAA"));