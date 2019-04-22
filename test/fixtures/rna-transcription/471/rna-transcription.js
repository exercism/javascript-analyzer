export function toRna(dna) {
    let rna = dna.split("");
    let conv = {
      	    "G":"C",
      	    "C":"G",
      	    "T":"A",
            "A":"U",
        };
    for(let i=0; i < rna.length; i++) {
	if(rna[i] in conv) {
            rna[i] = conv[rna[i]];
	} else {
	    throw new Error('Invalid input DNA.');
	}
    }
    
    return rna.join("");
}
