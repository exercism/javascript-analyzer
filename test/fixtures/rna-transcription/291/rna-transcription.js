export const toRna = (strand) =>{
	var conversion = {'A' : 'U', 'G' : 'C', 'C': 'G', 'T' : 'A'};
	return strand.split('').map(function(x){
		if(conversion[x] !== undefined ){
			return conversion[x]
		}else{
			throw new Error('Invalid input DNA.') 
		}
	}).join('');

}