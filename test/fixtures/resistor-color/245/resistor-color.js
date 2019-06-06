const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];
const colorCodeMap = {
    "black": 0, "brown": 1, "red": 2, "orange": 3, "yellow": 4, "green": 5, "blue": 6, "violet": 7, "grey": 8, "white": 8
};

function colorCode(color) {
    if (colorCodeMap[color] === undefined) {
        throw "Unknown color";
    }

    return colorCodeMap[color];
};

export { colorCode, COLORS };
