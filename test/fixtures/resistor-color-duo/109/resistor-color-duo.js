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

export function decodedValue(values) {
  return values.reverse().reduce((acc, decodedValue, index) => {
    return acc + COLORS.indexOf(decodedValue) * Math.pow(10, index);
  }, 0);
}
