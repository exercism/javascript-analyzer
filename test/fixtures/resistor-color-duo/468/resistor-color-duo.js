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

function decodedValue(colors) {
  return parseInt(colors.reduce((acc, color) => {
    return acc + COLORS.indexOf(color);
  }, ''), 10);
}

export {
  decodedValue
};
