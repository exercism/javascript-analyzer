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

export function decodedValue(colors) {
  return +colors.reduce((acc, c) => acc + COLORS.indexOf(c), "");
}
