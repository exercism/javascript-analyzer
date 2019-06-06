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
    "white"]

export const colorCode = (code = "Black") => {
    return COLORS.findIndex((e) => e == code);
}