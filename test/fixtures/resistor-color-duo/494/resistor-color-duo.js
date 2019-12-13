export const decodedValue = (resistorColors) => {
	let decodedValue = ""
	let bandColor = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

	for (let i = 0; i < resistorColors.length; i++) {
		decodedValue += bandColor.indexOf(resistorColors[i]).toString();
	}
	return parseInt(decodedValue);
};
