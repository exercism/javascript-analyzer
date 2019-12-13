const colors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
export const decodedValue = ([color1, color2]) => parseInt(colors.indexOf(color1) + '' + colors.indexOf(color2));
