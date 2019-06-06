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

const value = colors =>
  parseInt(
    colors.reduce((acc, curr) => acc + COLORS.indexOf(curr).toString(10), ""),
    10
  );

export { value };
