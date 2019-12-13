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

// Using array of COLORS, retrive the index as string
const colorCode = input => COLORS.indexOf(input).toString();

// Join the string, and convert to number
export const decodedValue = input => {
  return Number(input.map(resistor => colorCode(resistor)).join(""));
};
