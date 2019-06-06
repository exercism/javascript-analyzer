const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];
const colorCode = {};
COLORS.forEach((color, index) => {
  colorCode[color] = index;
})

export { COLORS, colorCode };
