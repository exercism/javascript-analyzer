const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

function getColorValue(color) {
  for (var y = 0; y < COLORS.length; y += 1) {
    if (color === COLORS[y]) {
      return y;
    }
  }
  return -1;
}

function decodedValue(colorNames) {
  const firstColorValue = getColorValue(colorNames[0]);
  const secondColorValue = getColorValue(colorNames[1]);
  return parseInt(`${firstColorValue}${secondColorValue}`, 10);
}


module.exports = {
  decodedValue
};
