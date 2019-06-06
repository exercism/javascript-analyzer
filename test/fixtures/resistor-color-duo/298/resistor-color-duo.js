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

export const value = ([color1, color2]) => {
  const firstIndex = COLORS.indexOf(color1);
  const secondIndex = COLORS.indexOf(color2);
  const strNumber = '' + firstIndex + secondIndex;

  return parseInt(strNumber);
}