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

function decodedValue([colorA, colorB]) {
  return COLORS.indexOf(colorA) * 10 + COLORS.indexOf(colorB);
}

module.exports = { decodedValue };
