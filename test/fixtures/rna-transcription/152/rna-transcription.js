export const toRna = (nucleotides) => {
	let result = '';
	for (let nucleotide of nucleotides) {
		try {
			result += nucleotideToRna(nucleotide);
		} catch (e) {
			throw e;
		}
	}
	return result;
}

const nucleotideToRna = (nucleotide) => {
	switch (nucleotide) {
		case 'C':
			return 'G';
		case 'G':
			return 'C';
		case 'A':
			return 'U';
		case 'T':
			return 'A';
		default:
			throw 'Invalid input DNA.';
	}
}