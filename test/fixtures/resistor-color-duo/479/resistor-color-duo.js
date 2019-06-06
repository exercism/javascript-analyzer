var COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

function value([colorOne, colorTwo]) {
    var colorOneIndex = COLORS.indexOf(colorOne);
    var colorTwoIndex = COLORS.indexOf(colorTwo);
    var colorsValue = `${colorOneIndex}${colorTwoIndex}`;
    var finalValue = Number(colorsValue);
    return finalValue;
}

export { value }