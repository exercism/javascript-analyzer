export { decodedValue, COLORS };

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

const decodedValue = aColors => {
  let sOutput = ``;
  aColors.forEach(el => (sOutput = sOutput + COLORS.indexOf(el)));
  return parseInt(sOutput);
};
