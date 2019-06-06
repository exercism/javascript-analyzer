const COLORS = [
  "black", "brown", "red", "orange",
  "yellow", "green", "blue", "violet",
  "grey", "white"
];

function colorCode(color) {
  return COLORS.indexOf(color);
}

export function value([color1, color2]) {
  return colorCode(color1) * 10 + colorCode(color2);
}