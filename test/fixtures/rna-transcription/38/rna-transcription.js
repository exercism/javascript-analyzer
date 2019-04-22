




export function isValid(s) {
	if (typeof(s) != "string") return false;
	return  !!s.match(/^[ATGC]*$/); 
};

export function toRna(str) {
	if ( ! isValid(str) ) throw 'Invalid input DNA.' ;
	var mm = { G : "C" , C : "G" ,T : "A" , A : "U"  }
	return  str.split('').map(x => mm[x]).join('')
};