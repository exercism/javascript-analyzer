const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

const colorCode = (color) => {
    return COLORS.indexOf(color);
}

export const decodedValue = (colorDuo) => {
    return Number(`${colorCode(colorDuo[0])}` + `${colorCode(colorDuo[1])}`);
}
