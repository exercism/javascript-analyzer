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
]

export function decodedValue (colors) {
    return COLORS.indexOf(colors[0]) * 10 + COLORS.indexOf(colors[1])
}
