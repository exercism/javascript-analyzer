export const COLORS = [
    'black',  // 0
    'brown',  // 1
    'red',    // 2
    'orange', // 3
    'yellow', // 4
    'green',  // 5
    'blue',   // 6
    'violet', // 7
    'grey',   // 8
    'white',  // 9
];

export const colorCode = (color) => COLORS.indexOf(color)
export const value = (colors) => {
    return parseInt(String(colorCode(colors[0])).concat(colorCode(colors[1])))
}
