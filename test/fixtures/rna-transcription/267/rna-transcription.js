const dnaToRna = {
    G: "C",
    C: "G",
    T: "A",
    A: "U"
}
const invalidDnaError = new Error("Invalid input DNA.");
export const toRna = dna => {
    const dnaArray = dna.split('');
    const rnaArray = [];
    for (let i = 0; i < dnaArray.length; i++) {
        const dnaHere = dnaArray[i];
        const rnaHere = dnaToRna[dnaHere];
        if (!rnaHere) {
            throw invalidDnaError;
        }
        rnaArray.push(rnaHere);
    }  
    return rnaArray.join('');
}




