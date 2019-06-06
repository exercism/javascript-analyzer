export const COLORS = [
    "black", "brown", "red", "orange", "yellow",
    "green", "blue", "violet", "grey", "white",
];

export const value = colors => colors.reduce((v, color) => 10 * v + COLORS.indexOf(color), 0);