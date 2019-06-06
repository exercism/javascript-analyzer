export const COLORS = [
	"black",
	"brown",
	"red",
	"orange",
	"yellow",
	"green",
	"blue",
	"violet",
	"grey",
	"white"
];

/**
 * @param {string} color
 * @return {number}
 */
export function colorCode(color) {
	const index = COLORS.findIndex((i) => i === color);

	if (index < 0) {
		throw new Error(`Color with name "${color}" missing`);
	}

	return index;
}
