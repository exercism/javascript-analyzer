const RESISTORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

export const decodedValue = (colors) => parseInt(colors.map(color => RESISTORS.findIndex(c => c === color)).join(''));
