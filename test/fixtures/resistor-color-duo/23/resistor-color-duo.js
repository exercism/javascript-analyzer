const COLORS = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white',
];

function colorCode(color) {
  return COLORS.indexOf(color);
}

function value(resistors) {
  return Number (resistors.map( resistor => {
    return colorCode(resistor);
 }).join(''));
}

export {value};