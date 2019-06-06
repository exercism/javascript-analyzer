const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]
export const value = (colors) =>
    colors.reduce((total, color) => total * 10 + COLORS.indexOf(color), 0)