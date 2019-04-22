/**
 * Generates the RNA complement of a given DNA string.
 * @param {string} dna
 * @returns {string} RNA complement of the DNA string.
 */
export function toRna(dna) {

    //resulting rna string
    let rna = "";

    //conversion keys
    const dnaKey = "CGAT";
    const rnaKey = "GCUA";

    //loop through each index of our DNA string
    for(let i = 0; i < dna.length; i++){
        //look for the letter at that position in the DNA key.
            let pos = dnaKey.search(dna[i]);
            //if found, add its RNA translation to our RNA string
            if (pos !== -1) {
                rna += rnaKey[pos];
            } else { // if we cant find the letter in the DNA key, our string is invalid.
                throw new Error('Invalid input DNA.');
            }

    }
    return rna;
}
