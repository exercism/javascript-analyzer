export const decodedValue = (colors) => {
	const CODES = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
	let result = "";

	colors.forEach(function (color) {result += CODES.indexOf(color).toString()});

	return parseInt(result);
};
