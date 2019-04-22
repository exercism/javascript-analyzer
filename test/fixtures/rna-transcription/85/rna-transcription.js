export const toRna = (dna) => {
	var rna='';
	[...dna].forEach(c => {
		switch (c){
			case 'C': rna+='G';break;
			case 'G': rna+='C';break;
			case 'A': rna+='U';break;
			case 'T': rna+='A';break;
			default:
				throw new Error('Invalid input DNA.')
		}
	});
	return rna;
};
