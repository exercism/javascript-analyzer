const COLORS = [ 'black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white' ];

function colorCode(colorName) {
	for (let i = 0; i < 10; i++) {
		if (colorName === COLORS[i]) {
			return i;
		}
	}
}

export { colorCode, COLORS };
