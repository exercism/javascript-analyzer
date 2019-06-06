export const value = colors => {
  const digits = colors.map(color => COLORS.indexOf(color));
  return digits[0] * 10 + digits[1];
};

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
