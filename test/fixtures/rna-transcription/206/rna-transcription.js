export const toRna = dna => {
	const splitSeq = dna.split('')
	const rna = []

	splitSeq.forEach(letter => {
		switch(letter) {
			case 'C':
				rna.push('G')
				break
			case 'G':
				rna.push('C')
				break
			case 'T':
				rna.push('A')
				break
			case 'A':
				rna.push('U')
				break
			default:
				throw new Error('Invalid input DNA.')
		}
	})

	return rna.join('')
}

