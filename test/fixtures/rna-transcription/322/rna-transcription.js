const table = {
	'C': 'G',
	'G': 'C',
	'A': 'U',
	'T': 'A',
};

export const toRna = (input) => {
	let output = "";

	for( const nucleotide of input )
		if (table[nucleotide])
			output += table[nucleotide];
		else
			throw new Error('Invalid input DNA.');

	return output;
};
