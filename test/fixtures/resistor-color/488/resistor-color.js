
export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export const colorCode = (COLORS) => {
	let array = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
	let color = COLORS.toLowerCase();
	let index = array.indexOf(color);
	return index;
}
