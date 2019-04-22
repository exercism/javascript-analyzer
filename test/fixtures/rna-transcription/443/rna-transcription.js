export const toRna = dna => {
	let rna = "";
	for(let i = 0; i < dna.length; i++) {
		if (dna[i] === "A") {
			rna += "U";
		} else if (dna[i] === "C") {
			rna += "G";
		} else if (dna[i] === "G") {
			rna += "C";
		} else {
			rna += "A";
		}
	}
	return rna;
}