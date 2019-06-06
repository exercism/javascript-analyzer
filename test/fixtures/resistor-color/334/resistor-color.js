export const colorCode = sColor => {
  let index = 0;
  COLORS.find((el, idx) => {
    index = idx;
    return el === sColor;
  });
  return index;
};

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
