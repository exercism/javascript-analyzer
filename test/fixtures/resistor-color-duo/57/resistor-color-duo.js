const ENCODED_COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

const resistanceCalculator = (resistanceValue, color, index) => resistanceValue + ENCODED_COLORS.indexOf(color)*Math.pow(10, index);

export const value = (colors) => colors.reverse().reduce(resistanceCalculator, 0);