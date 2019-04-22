export function toRna (strg){
    var rna = "" ;

	for(var i = 0; i < strg.length; i ++) {
		if (strg[i] === 'G') {
			rna += strg[i].replace('G','C');
		} else if(strg[i] === 'C') {
			rna += strg[i].replace('C','G');
		} else if(strg[i] === 'T') {
			rna += strg[i].replace('T','A');
        }else if (strg[i] === 'A') {
			rna += strg[i].replace('A','U');
        }
        else if (strg[i] !== 'A' || strg[i] !== 'T' || strg[i] !== 'C' || strg[i] !== 'G') {
            throw new Error("Invalid input DNA.");
        }

	}
	return rna;
}