const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

export const value = (colors) => Number.parseInt(colors.map((color) => COLORS.indexOf(color)).join(''));
