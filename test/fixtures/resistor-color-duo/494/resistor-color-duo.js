export const value = (resistorColors) => {
	let value = ""
	let bandColor = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

	for (let i = 0; i < resistorColors.length; i++) {
		value += bandColor.indexOf(resistorColors[i]).toString();
	}
	return parseInt(value);
};