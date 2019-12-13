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

export const decodedValue = colors =>
  colors
    .reverse()
    .reduce(
      (acc, color, index) => acc + COLORS.indexOf(color) * 10 ** index,
      0
    );
