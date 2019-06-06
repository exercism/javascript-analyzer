export let COLORS = [
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
 * Returns index of `color` in COLORS array
 * @param {String} color
 */
export let colorCode =
	color => COLORS.findIndex(item => color === item);