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

const colorCode = color => COLORS.findIndex(element => element === color);

export { COLORS, colorCode };
