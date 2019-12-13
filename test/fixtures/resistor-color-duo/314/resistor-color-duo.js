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

export const decodedValue = colorCode.reduce((decodedValue, currentColor) =>
decodedValue + currentColor.colorCode, // reducer function
  0 // initial accumulator decodedValue
);

