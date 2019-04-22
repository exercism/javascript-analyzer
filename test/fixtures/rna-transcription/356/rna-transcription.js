// Several choices for the for loop: https://stackoverflow.com/a/41573058/342785
export const toRna = (dnaStrand) => {
    let ADENYNE = 'A'
    let CYTOSINE = 'C'
    let GUANINE = 'G'
    let THYMINE = 'T'
    let URACIL = 'U'
    
    let complement = {};
    complement[GUANINE] = CYTOSINE;
    complement[CYTOSINE] = GUANINE;
    complement[THYMINE] = ADENYNE;
    complement[ADENYNE] = URACIL;

    let rna_strand = "";

    for (let letter of dnaStrand) {
        if(complement[letter] === undefined) {
            throw new Error('Invalid input DNA.'); 
        }
        rna_strand += complement[letter];
    }

    return rna_strand
}
