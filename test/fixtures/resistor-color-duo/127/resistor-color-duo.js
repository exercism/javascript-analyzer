const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
const colorCode = (code) => COLORS.indexOf(code);
const value = (arr) => parseInt(arr.map(code => colorCode(code) + '').join(''));

export { value }