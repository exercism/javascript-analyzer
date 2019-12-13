const color = [
	'black',
	'brown',
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'violet',
	'grey',
	'white',
];

const colorMap = color.reduce((map, color, index) => {
	map[color] = index;
	return map;
}, {});

export const decodedValue = (colors) => colors
	.reduce((result, color) => result * 10 + colorMap[color], 0);
