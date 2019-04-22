export const toRna = (dna) => {
	const transcriptionKey = {
		G: "C",
		C: "G",
		T: "A",
		A: "U",
	};

	// Normalize the input string
	dna = dna.toUpperCase();

	// Convert the dna string into a character array
	const dnaAr = [...dna];

	// Map over each character to transcribe the DNA base to the RNA match
	const rnaAr = dnaAr.map((base) => {
		if (!transcriptionKey[base]) {
			throw new Error('Invalid input DNA.');
		}
		
		return transcriptionKey[base];
	});

	// Convert the transcribed array back to a string
	return rnaAr.join("");
}