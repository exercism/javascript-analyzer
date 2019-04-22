const dnaToRnaMap = { 'G': 'C', 'C': 'G', 'T': 'A', 'A': 'U' };

const dnaToRna = nucleotide => dnaToRnaMap[nucleotide];

const dnaContainsInvalidCharacters = dna =>
	!dna.every(x => x in dnaToRnaMap);

const throwIfDnaInvalid = dna => {
	if(dnaContainsInvalidCharacters(dna)) {
		throw new Error('Invalid input DNA.');
	}
	
	return dna;
};

export const toRna = dna =>
	throwIfDnaInvalid([...dna])
		.map(dnaToRna)
		.join('');