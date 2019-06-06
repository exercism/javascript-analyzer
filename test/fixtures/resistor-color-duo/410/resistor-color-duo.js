
export const value = (colorArr) => {
	let color1 = colorArr[0];
	let color2 = colorArr[1];
	const colors = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
	let index1 = colors.indexOf(color1);
	let index2 = colors.indexOf(color2);
	let combined = `${index1}${index2}`;
	let finalInt = parseInt(combined);
	return finalInt;
};