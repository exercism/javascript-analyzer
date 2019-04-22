export const toRna = (seq) => {
	const newArr = [];
	seq.split('').forEach((i) => {
		if (i !== 'C' && i !== 'G' && i !== 'A' && i !== 'T') {
			throw Error('Invalid input DNA.');
		}
		
		newArr.push(
			(i === 'C') ? ('G'
			) : (i === 'G') ? ('C'
			) : (i === 'A') ? ('U'
			) : (i === 'T') ? ('A'
			) : (''),
		);
	});

  return newArr.join('');
};
