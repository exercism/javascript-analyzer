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

const colorCode = color => {
  return COLORS.indexOf(color);
};

export const value = colorCode.reduce((value, currentColor) =>
value + currentColor.colorCode, // reducer function
  0 // initial accumulator value
);

