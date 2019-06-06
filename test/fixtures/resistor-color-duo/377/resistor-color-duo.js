const allColors = [
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

export function value(resistorColors) {
  let total = "";
  resistorColors.forEach(color => {
    total = total.concat(allColors.indexOf(color));
  });

  return parseInt(total);
}
