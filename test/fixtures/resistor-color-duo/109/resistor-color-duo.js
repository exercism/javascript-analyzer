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

export function value(values) {
  return values.reverse().reduce((acc, value, index) => {
    return acc + COLORS.indexOf(value) * Math.pow(10, index);
  }, 0);
}
