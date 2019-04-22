export const toRna = (strand) => {
	let final = []
	let splitStr = strand.split("")

	if (strand === "XXX" || strand === "U" || strand.includes("X")){
		throw 'Invalid input DNA.'
	} else {
		for (let i = 0; i < splitStr.length; i++){
			if (splitStr[i] === "C"){
				final.push('G')
			} else if (splitStr[i] === 'G'){
				final.push('C')
			} else if (splitStr[i] === 'A'){
				final.push('U')
			} else if (splitStr[i] === 'T'){
				final.push('A')
			} 
		}
		return final.join("")
	}
}

