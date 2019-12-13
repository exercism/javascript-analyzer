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

export const decodedValue = colors => {
  var numbers = "";
  colors.forEach(function(ele) {
    numbers += "" + COLORS.indexOf(ele);
  });
  return Number(numbers);
};
