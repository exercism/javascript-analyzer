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

const colorValue = color => COLORS.indexOf(color);

export const decodedValue = colors => {
  const allDigits = colors.reduce(
    (digits, color) => digits + colorValue(color),
    ""
  );
  return parseInt(allDigits);
};
