export function toRna(dna){
	const pairs = {
		'G' : 'C',
		'C' : 'G',
		'T' : 'A',
		'A' : 'U'
	}
	let output = '';
	for (let i = 0; i < dna.length; i++){
		if (!pairs[dna[i]]){
			throw 'Invalid input DNA.';
		}
		output += pairs[dna[i]];
	}
	return output;
}
