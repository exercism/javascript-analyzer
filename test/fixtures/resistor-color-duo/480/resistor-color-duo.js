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

export const decodedValue = colors => {
  let colorNumbers = [];
  colors.forEach(color => {
    return colorNumbers.push(COLORS.indexOf(color));
  });
  return parseInt(colorNumbers.join(""));
};
