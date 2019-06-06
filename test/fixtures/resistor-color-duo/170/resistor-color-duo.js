const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export const value = colors => {
    const colorCode = color => COLORS.indexOf(color);

    return colorCode(colors[0]) * 10 + colorCode(colors[1])
};
