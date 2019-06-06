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
    "white",
]

export const value = (colors) => {
    let val = '';
    colors.forEach(element => {
        val += COLORS.indexOf(element);
    });
    return Number(val);
}