export function colorCode(color = "black") {
    var i = 0
    for (i = 0; i < COLORS.length; i++)
    {
        if (color === COLORS[i]) {
            return i
        }
    }
}

export const COLORS = [
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
