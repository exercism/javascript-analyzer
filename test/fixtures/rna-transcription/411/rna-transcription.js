export const toRna = (string) => {
	let rna = [];

	if (string == "")
		return string;

	string.split('');

	for (var i = 0; i < string.length; i++)
	{
		if (string[i] == 'A')
			rna.push('U');
		else if (string[i] == 'T')
			rna.push('A');
		else if (string[i] == 'G')
			rna.push('C');
		else if (string[i] == 'C')
			rna.push('G');
		else
		{
			throw new Error('Invalid input DNA.');
		}
	}
	return rna.join('');
}
