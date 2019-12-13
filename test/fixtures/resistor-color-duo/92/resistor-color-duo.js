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

export const decodedValue = colors =>
    colors.reduce((prev, curr) => {
        return parseInt(COLORS.indexOf(prev) + "" + COLORS.indexOf(curr));
    });
