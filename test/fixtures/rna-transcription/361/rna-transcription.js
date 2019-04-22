export const toRna = (toRna) => {

		if(/[^CGTA]/.test(toRna)) {
			
		throw "Invalid input DNA.";
   
		}else {
			
		var chars = {'G':'C','C':'G','T':'A','A':'U'};
				
		//return toRna.replace("G", "C").replace("C", "G").replace("A", "U").replace("T", "A");	
		/*tried this but didnt work as it replaced already replaced chars, found this other solution but not fully u
		understanding this par:  m => chars[m] */
		return toRna.replace(/[GCTA]/g, m => chars[m]);
			
		
			
}

}
