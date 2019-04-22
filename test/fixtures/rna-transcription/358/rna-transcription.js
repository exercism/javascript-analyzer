
export const  toRna = (dna) => {
	var danToRnaMapping, dna_r;
    if (!dna) { return dna; } ;
	danToRnaMapping	=  {
		G: 'C',
		C: 'G',
		T: 'A',
		A: 'U'
	};
    dna_r = dna.split('');
    
    for (var i = dna_r.length - 1; i >= 0; i--) {

    	if(!danToRnaMapping[dna_r[i]]) { throw new Error('Invalid input DNA.')};
    	dna_r[i] = danToRnaMapping[dna_r[i]];
   
    }
	return dna_r.join('');
}