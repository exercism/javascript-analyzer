//@ts-check
const colorConverter = {
    'black': 0,
    'brown': 1,
    'red': 2,
    'orange': 3,
    'yellow': 4,
    'green': 5,
    'blue': 6,
    'violet': 7,
    'grey': 8,
    'white': 9
}

/**
 *
 * @param {Array<string>} colors
 * @returns {number}
 */
export function decodedValue(colors) {
    return colorConverter[colors[0]] * 10 + colorConverter[colors[1]];
}
