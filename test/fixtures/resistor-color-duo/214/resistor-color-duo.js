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

const decodedValue = ([firstItem, secondItem]) => {
  return Number(String(COLORS.indexOf(firstItem)) + String(COLORS.indexOf(secondItem)));
}

export { decodedValue };
