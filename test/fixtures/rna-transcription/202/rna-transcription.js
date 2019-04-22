export const toRna = sequence => {
	let result = ""
	sequence.split('').forEach(nucleotide => {
		result += Dictionary[nucleotide]
		if(result.includes(undefined)) throw new Error("Invalid input DNA.")
	})
	return result
}

const Dictionary = {
	"G": "C",
	"C": "G",
	"T": "A",
	"A": "U"
}