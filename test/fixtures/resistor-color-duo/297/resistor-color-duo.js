const COLORS = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white",
];

function colorCode(color) {
  return COLORS.findIndex(resistor => resistor === color.toLowerCase());
}

export function value(colors) {
  let value = "";

  colors.forEach(color => {
    value += `${colorCode(color)}`;
  });

  return parseInt(value);
}
