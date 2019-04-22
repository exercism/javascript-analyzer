const rnaComplement = new Map([
	['G', 'C'],
	['C', 'G'],
	['T', 'A'],
	['A', 'U']
]);

export const toRna = str => {
	return str.split('').map(nuc => {
		const comp = rnaComplement.get(nuc);

		if (comp == null) throw new Error('Invalid input DNA.');
		return comp;
	}).join('');
}