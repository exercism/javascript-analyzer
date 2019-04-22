export const toRna = (dna) => {
	if (dna) {
		let rna ='';
		let n;
		for (let i=0; i<dna.length; i++) {
			switch (dna[i]) {
				case 'G':
					n = dna[i].replace('G', 'C');
					break;
				case 'C':
					n = dna[i].replace('C', 'G');
					break;
				case 'T':
					n = dna[i].replace('T', 'A');
					break;
				case 'A':
					n = dna[i].replace('A', 'U');
					break;
				default:
					throw 'Invalid input DNA.';
			}
			rna = rna += n;
		}
		return rna;
	} else {
		return dna;
	}
	
}