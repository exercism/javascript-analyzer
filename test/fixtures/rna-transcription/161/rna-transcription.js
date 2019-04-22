const mapDnaToRna = {
	'G': 'C',
	'C': 'G',
	'T': 'A',
	'A': 'U'
};

export const toRna = (dnaStrand) => {
	const rna = Array.from(dnaStrand, (nucleotide) => {
		if (mapDnaToRna.hasOwnProperty(nucleotide)) {
			return mapDnaToRna[nucleotide];
		} else {
			throw new Error('Invalid input DNA.');
		}
	}).join('');

	return rna;
}


