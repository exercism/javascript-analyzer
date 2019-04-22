export const mapper = {
	G: 'C',
	C: 'G',
	T: 'A',
	A: 'U'
};

/**
 * For given dna string in capital letters
 * returns new rna complement string.
 *
 * @param {string} dna
 * @returns {string}
 */
export const toRna = (dna) => {
	if ( typeof dna !== 'string') {
		throw new Error('Invalid input DNA.')
	}

	let rna = '';

	for (const character of dna){
		if (! mapper.hasOwnProperty(character)) {
			throw new Error('Invalid input DNA.')
		}

		rna += mapper[character];
	}

	return rna;
};
