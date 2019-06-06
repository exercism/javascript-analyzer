
const colorCode = (color) => {

	console.log(color);

	let COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

	if(color == "COLORS") return COLORS.toString();

	else return COLORS.indexOf(color);

};

export {colorCode};