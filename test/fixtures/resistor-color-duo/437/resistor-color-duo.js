const COLORS = [
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

export const value = (colors) => {
    let result = 0;
    while (colors.length > 0) {
        let color = colors.shift();
        result = result * 10 + COLORS.indexOf(color.toLowerCase());
    }

    return result;
};
