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

function value(colors) {
  return parseInt(colors.reduce((acc, color) => {
    return acc + COLORS.indexOf(color);
  }, ''), 10);
}

export {
  value
};
