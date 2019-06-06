export const value = ([x, y]) => {
    const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
    const a = COLORS.indexOf(x) * 10;
    const b = COLORS.indexOf(y);
    return a + b;
};



