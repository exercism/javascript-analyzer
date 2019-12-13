const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

export const decodedValue = colors => parseInt(colors.reduce((acc, color) => `${acc}${COLORS.indexOf(color)}`, ''), 10)

