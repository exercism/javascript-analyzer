const lookupMapRNA = {
    "G": "C",
    "C": "G",
    "T": "A",
    "A": "U",
    "": ""
};

export const toRna = (rna) => {
    let allCodes = ""
    for(let x = 0; x < rna.length; x++){
        const code = lookupMapRNA[rna[x]];
        if(code == undefined){
            throw new Error("Invalid input DNA.");
        }
        allCodes += code
    }
    return allCodes
};