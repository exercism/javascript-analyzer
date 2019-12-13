const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
export const decodedValue = function ([color1, color2]) {
    return parseInt(COLORS.indexOf(color1).toString() + COLORS.indexOf(color2).toString());
};
