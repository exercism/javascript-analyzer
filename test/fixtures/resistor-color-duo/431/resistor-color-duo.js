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

export const decodedValue = ([first, second]) => {
    return parseInt(`${COLORS.indexOf(first)}${COLORS.indexOf(second)}`, 10);
}
