// Array of colours for transistors
const COLORS = [
  "black", // 0
  "brown", // 1
  "red", // 2
  "orange", // 3
  "yellow", // 4
  "green", // 5
  "blue", // 6
  "violet", // 7
  "grey", // 8
  "white" //9
];

// Returns the index of the provided colour
function colorCode (colour) {
  return COLORS.indexOf(colour);
}

export {
  COLORS,
  colorCode
}
