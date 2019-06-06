const resistorColors = [
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

export const colorCode = color => {
  return resistorColors.indexOf(color);
};

export const COLORS = () => {
  return resistorColors;
};
