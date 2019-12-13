const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

function digit(color) {
    return COLORS.indexOf(color);
}

export function decodedValue(colors) {
    return digit(colors[0]) * 10 + digit(colors[1]);
}
