export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export const value = (colors) => {
	var firstValue = COLORS.indexOf(colors[0].toLowerCase());
	var secondValue = COLORS.indexOf(colors[1].toLowerCase());
	
	return(10 * firstValue + secondValue);
};