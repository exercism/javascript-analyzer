var COLORS = [
  "black",
  "brown",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "violet",
  "grey",
  "white"
];

function colorToValue(color) {
  return COLORS.indexOf(color);
}

export function value(band_colors) {
  return Number(band_colors.map(colorToValue).join(""));
}
