const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export const value = (colorNames) => {
    var resistanceValue = "";
    colorNames.forEach(colorName => resistanceValue += COLORS.indexOf(colorName));
    return parseInt(resistanceValue);
}