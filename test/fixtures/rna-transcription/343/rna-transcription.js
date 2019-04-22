export const toRna = (dna) =>{
    var hashTable = {
        'G': 'C',
        'C': 'G',
        'T': 'A',
        'A': 'U'
    };
    var rna="";
    
    for(let i=0; i < dna.length; i++){
        if(!hashTable.hasOwnProperty(dna[i])) 
            throw new Error("Invalid input DNA.");
        rna += hashTable[dna[i]];
    }
    return rna;
}

