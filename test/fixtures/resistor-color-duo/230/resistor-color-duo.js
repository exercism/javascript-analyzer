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

export const value = colors => {
  let c1 = COLORS.indexOf(colors[0].toLowerCase()).toString();
  let c2 = COLORS.indexOf(colors[1].toLowerCase()).toString();
  return parseInt(c1 + c2);
};
