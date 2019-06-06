const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

const colorCode = (color) => {
	if(color) {
		color = color.toLowerCase();
		return COLORS.indexOf(color);
	}
	else return null;
}

export { COLORS, colorCode };