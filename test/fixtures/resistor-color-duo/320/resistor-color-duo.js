var COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white'];

const colorCode = (color) => COLORS.indexOf(color);

function value(color1, color2) {

  var firstValue = colorCode(color1).toString;
  var secondValue = colorCode(color2).toString;
  var truth = '${firstValue}' + '${secondValue}';
  return truth;
}

export { COLORS, value };