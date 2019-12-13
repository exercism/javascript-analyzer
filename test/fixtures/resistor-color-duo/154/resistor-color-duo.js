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

export const decodedValue = params =>
  parseInt(`${COLORS.indexOf(params[0])}${COLORS.indexOf(params[1])}`);
