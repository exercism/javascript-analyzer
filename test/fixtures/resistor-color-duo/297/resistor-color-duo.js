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

export function decodedValue(colors) {
  let decodedValue = "";

  colors.forEach(color => {
    decodedValue += `${colorCode(color)}`;
  });

  return parseInt(decodedValue);
}
