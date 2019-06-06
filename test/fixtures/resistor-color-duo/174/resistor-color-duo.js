const Colors = [
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

export const value = ([c1, c2]) =>
  Colors.findIndex(d => d === c1) * 10 + Colors.findIndex(d => d === c2);
