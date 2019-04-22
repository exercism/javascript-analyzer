export const toRna = function(dna) {
	let rna = "";
	for (let i = 0; i < dna.length; i++) {
		switch(dna[i]) {
			case "A":
				rna += "U";
				break;
			case "G":
				rna += "C";
				break;
			case "C":
				rna += "G";
				break;
			case "T":
				rna += "A";
				break;
			default:
				throw new Error("Invalid input DNA.");
		}
	}
	return rna;
}