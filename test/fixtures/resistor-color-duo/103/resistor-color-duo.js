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

export const decodedValue = (colors) => {
  const stringValue = colors
    .map((color) => COLORS.indexOf(color))
    .join('');

  return parseInt(stringValue);
};
