const valuesMapping = {G: 'C', C: 'G', T: 'A', A: 'U'};

export const toRna = dna => {
	return dna.split('').map(replace).join('');
}

const replace = (nucleotide) => {
	if (valuesMapping.hasOwnProperty(nucleotide)) {
		return valuesMapping[nucleotide];
	} 
	throw new Error('Invalid input DNA.')
}
