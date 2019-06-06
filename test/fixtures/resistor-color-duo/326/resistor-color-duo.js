export const COLORS = [
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

export const value = ([ color1, color2 ]) => {
	const result = parseInt(
		`${COLORS.indexOf(color1)}${COLORS.indexOf(color2)}`,
		10
	);
	return result < 0 ? 'Invalid Color Supplied' : result;
};
