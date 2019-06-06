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

export const value = (colors) => {
  return colors
          .map(i => COLORS.indexOf(i))
          .join('') * 1;
}