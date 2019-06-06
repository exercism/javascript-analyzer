export const value = (colors) => {
	const values = [
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

	const number = Number(`${values.indexOf(colors[0])}${values.indexOf(colors[1])}`);
	return number;
}