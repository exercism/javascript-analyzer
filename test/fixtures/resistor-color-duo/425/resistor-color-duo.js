export const colors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

export function getCode (color1, color2) {
	var firstColor = colors.indexof(color1);
	var secondColor = colors.indexof(color2);
	return "" + firstColor + secondColor;
}