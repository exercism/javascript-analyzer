const COLORS = [
	'black',
	'brown',
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'violet',
	'grey',
	'white'
];

export const decodedValue = colors => {
	if (!colors || !Array.isArray(colors)) return null;

	let resistance = 0;
	let coefficient = 1;

	colors.reverse().forEach(color => {
		resistance += COLORS.indexOf(color) * coefficient;
		coefficient *= 10;
	});

	return resistance;
};
