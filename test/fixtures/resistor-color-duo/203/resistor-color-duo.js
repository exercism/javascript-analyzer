export function decodedValue([color1, color2]) {
  let COLORS = [
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

  let string1 = COLORS.indexOf(color1).toString();
  let string2 = COLORS.indexOf(color2).toString();
  let stringSum = string1 + string2;
  stringSum = parseInt(stringSum);
  return stringSum;
}
