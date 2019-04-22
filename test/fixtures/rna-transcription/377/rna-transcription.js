export const toRna = (dna) => {
	let string = dna.split(" ");

	for (let i = 0; i < 4; i++) {
		if (string[i] === "G") {
			string[i] = "C"
		} else if (string[i] === "C") {
			string[i] = "G"
		} else if (string[i] === "T")
			string[i] = "A"
		else if (string[i] === "A") {
			string[i] = "U"
		}
	}

	const RNA = string.join();
	return RNA;
}
