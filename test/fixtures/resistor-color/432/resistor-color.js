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
 * @param {string} color
 * @returns {Number}
 */
export function colorCode(color) {
    return colorConverter[color];
}

export const COLORS = Object.keys(colorConverter);
