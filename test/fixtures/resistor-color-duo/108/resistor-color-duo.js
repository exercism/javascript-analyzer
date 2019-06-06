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

export const value = (value_list) => {
    const tens = COLORS.indexOf(value_list[0]);
    const ones = COLORS.indexOf(value_list[1]);
    return tens * 10 + ones;
};