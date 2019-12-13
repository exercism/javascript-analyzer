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

export const decodedValue = (bands) => {
    let output = '';
    bands.forEach((color) => {
        output += COLORS.indexOf(color);
    });
    return parseInt(output);
}
