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

export const decodedValue = ([res1, res2]) => {
  return parseInt(
    COLORS.indexOf(res1).toString() + COLORS.indexOf(res2).toString()
  );
};
