export { value, COLORS };

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

const value = aColors => {
  let sOutput = ``;
  aColors.forEach(el => (sOutput = sOutput + COLORS.indexOf(el)));
  return parseInt(sOutput);
};
