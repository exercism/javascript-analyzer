export const toRna = (Dna) => {
	var Rna = Dna.split("");
	for (var i = 0; i < Rna.length; i++) {
		switch (Rna[i]) {
			case 'C':
				Rna[i] = 'G';
				break;
			case 'G':
				Rna[i] = 'C';
				break;
			case 'A':
				Rna[i] = 'U';
				break;
			case 'T':
				Rna[i] = 'A';
				break;
			default:
				throw new Error("Invalid input DNA.");
		}
	}
	return Rna.join("");
}