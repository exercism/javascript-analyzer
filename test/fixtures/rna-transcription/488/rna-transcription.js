export function toRna(dna) {
	if (dna.match(/[^ATCG]/)) {
		throw('Invalid input DNA.');
	}
	dna = dna.replace(/A/g, 'u');
	dna = dna.replace(/T/g, 'a');
	dna = dna.replace(/C/g, 'g');
	dna = dna.replace(/G/g, 'c');
	return dna.toUpperCase();
};