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

export const value = arr => {
  let total = "";
  arr.forEach(function(color) {
    total += COLORS.indexOf(color);
  });
  return Number(total);
};
