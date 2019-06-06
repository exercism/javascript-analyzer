var COLORS = {black:0, brown:1, red: 2, orange: 3, yellow: 4, green: 5, blue: 6, violet: 7, grey: 8, white: 9}
function colorCode(color){
	return COLORS[color];
}

const newColors = Object.keys(COLORS)

module.exports.colorCode = colorCode;
module.exports.COLORS = newColors;
