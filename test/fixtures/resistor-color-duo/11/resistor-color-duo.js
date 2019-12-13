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

export const decodedValue = color => {
  let number = "";
  color.forEach(element => {
    number += COLORS.indexOf(element).toString();
  });
  return parseInt(number);
};
