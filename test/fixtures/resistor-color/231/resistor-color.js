export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
export const colorCode = function colorCode(color) {
    for (let i = 0; i < COLORS.length; i ++) {
	let current = COLORS[i];

	if (color == current) {
	    return i;
	}
    }
}
