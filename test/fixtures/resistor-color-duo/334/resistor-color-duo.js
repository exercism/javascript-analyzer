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

export const decodedValue = array => {
  return (
    COLORS.indexOf(array[0]).toString() + COLORS.indexOf(array[1]).toString()
  );
};
