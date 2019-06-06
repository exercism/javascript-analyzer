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
]

export const colorCode = (colorName = COLORS) => {
	return COLORS.indexOf(colorName)
}