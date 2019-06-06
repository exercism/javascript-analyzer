export var COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export function colorCode(color) {
    if (color === 'Colors') return COLORS;
    else return COLORS.indexOf(color);
}

colorCode("black");