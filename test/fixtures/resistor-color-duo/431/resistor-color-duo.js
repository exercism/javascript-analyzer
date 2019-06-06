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

export const value = ([first, second]) => {
    return parseInt(`${COLORS.indexOf(first)}${COLORS.indexOf(second)}`, 10);
}