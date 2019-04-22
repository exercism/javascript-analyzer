export const toRna = (dna)=>{
	let y = dna.split('');
	for(let z=0; z < y.length; z++){
		if(y[z] === 'G'){
			y[z] = 'C';
		} else if(y[z] === 'C'){
			y[z] = 'G';
		} else if(y[z] === 'T'){
			y[z] = 'A';
		}else if(y[z] === 'A'){
			y[z] = 'U';
		} else {
			throw new Error('Invalid input DNA.');
		}
		
	}
	return y.join('');
}
