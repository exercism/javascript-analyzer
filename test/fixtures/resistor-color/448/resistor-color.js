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

export const colorCode = (color) => {
	const code = COLORS.indexOf(color);
	return code === -1 ? 'Invalid Color Input' : code;
};
