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
  "white"
];

function colorCode(color) {
  return COLORS.indexOf(color);
}

export function decodedValue(colors) {
  return colors.reduce((acc, color) => acc * 10 + colorCode(color), 0);
}
