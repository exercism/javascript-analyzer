export const COLORS = [
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

export const decodedValue = color =>
  parseInt(
    COLORS.indexOf(color[0]).toString() + COLORS.indexOf(color[1]).toString()
  );
