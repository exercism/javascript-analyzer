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

const colorCode = color => COLORS.indexOf(color.toLowerCase().trim());

export const decodedValue = colors => parseInt(colors.map(c => colorCode(c)).join(""));
