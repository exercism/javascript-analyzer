export const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
export const value = bands => Number(bands.reduce((acc, col) => acc + COLORS.indexOf(col), ''));
