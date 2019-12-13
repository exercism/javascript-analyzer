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

export const decodedValue = colors => {
  return Number(
    colors.reduce(
      (accumulator, color) => accumulator + COLORS.indexOf(color),
      ""
    )
  );
};
