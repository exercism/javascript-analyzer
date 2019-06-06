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

function value([colorA, colorB]) {
  return COLORS.indexOf(colorA) * 10 + COLORS.indexOf(colorB);
}

module.exports = { value };
