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

const colorCode = (color) => COLORS.indexOf(color);

export const decodedValue = color => ((colorCode(color[0]) * 10) + colorCode(color[1]));
