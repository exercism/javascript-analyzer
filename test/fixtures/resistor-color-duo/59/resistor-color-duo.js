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

const colorCode = color => COLORS.indexOf(color);

export const value = ([firstColor, secondColor]) =>
	Number(`${colorCode(firstColor)}${colorCode(secondColor)}`);
