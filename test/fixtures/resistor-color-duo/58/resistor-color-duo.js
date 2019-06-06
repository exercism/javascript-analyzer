const colors = [
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

export const value = ([first, second]) =>
  colors.indexOf(first) * 10 + colors.indexOf(second);
