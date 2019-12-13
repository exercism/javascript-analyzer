const COLORS = {
    "black": 0,
    "brown": 1,
    "red": 2,
    "orange": 3,
    "yellow": 4,
    "green": 5,
    "blue": 6,
    "violet": 7,
    "grey": 8,
    "white": 9}

export const decodedValue = function (colors) {
	let color1 = colors[0];
	let color2 = colors[1];

	let first = COLORS[color1].toString();
	let second = COLORS[color2].toString();

	let total = parseInt((first + second), 10);
	return (total);
}
