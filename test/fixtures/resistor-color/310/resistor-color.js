const COLOR_MAP = { "black": 0, "brown": 1, "red": 2, "orange": 3, "yellow": 4, "green": 5, "blue": 6, "violet": 7, "grey": 8, "white": 9 }
const COLORS = Object.keys(COLOR_MAP)


function colorCode(color) {
    return COLOR_MAP[color]
}

export { colorCode, COLORS }