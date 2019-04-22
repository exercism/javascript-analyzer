export const toRna = (dna) => 
{
	var rna = '';
	var regex = /[^A^T^G^C]/g;
	if(dna.match(regex))
	{
		throw new Error('Invalid input DNA.');
	}
	console.log("printed");
	for(var i = 0; i < dna.length; i++){
		switch(dna[i])
		{
			case 'A':
				rna += 'U';
				break;
			case 'T':
				rna += 'A';
				break;
			case 'G':
				rna += 'C';
				break;
			case 'C':
			  rna += 'G';
				break;
		}
	}
	return rna;
 };
