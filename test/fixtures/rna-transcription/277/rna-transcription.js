export const toRna = dna => {
   
    var rna = "";
    
        for (var i = 0; i<dna.length; i++) {
            
            if (dna[i] == "G") {
                rna += "C";
            } else if (dna[i] == "C") {
                rna += "G"
            } else if (dna[i] == "T") {
                rna += "A"
            } else if (dna[i] == "A") {
                rna += "U";
            } else {
                try {
                    if (dna[i] !== "G" || "C" || "T" || "A" || "") throw "Invalid input DNA.";
                }
                catch(err) {rna = err;}
            };
            
        }

    
    return rna;
        
}
