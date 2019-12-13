const COLORS = [
    "black",
    "brown",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "violet",
    "grey",
    "white"
];

function code(name) {
    return COLORS.indexOf(name);
}

function decodedValue(bands) {
    return code(bands[0]) * 10 + code(bands[1]);
}

export { decodedValue };
