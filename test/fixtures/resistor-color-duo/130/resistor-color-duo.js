
const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

const colorCode = (color) => {
    const decodedValue = COLORS.indexOf(color);
    if (decodedValue === -1) {
        throw new Error(`Invalid color name: ${color}`)
    }
    return decodedValue;
};

export const decodedValue = (colors) => {
    let total = 0;
    for (const [index, color] of colors.entries()) {
        total = (total * 10) + colorCode(color);
    }
    return total;
};
