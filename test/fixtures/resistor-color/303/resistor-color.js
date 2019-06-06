let COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

function colorCode(color) {
    return ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"].indexOf(color);
}

module.exports = {
    colorCode,
    COLORS
}