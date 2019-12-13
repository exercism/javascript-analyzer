const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
const colorCode = (code) => COLORS.indexOf(code);
const decodedValue = (arr) => parseInt(arr.map(code => colorCode(code) + '').join(''));

export { decodedValue }
