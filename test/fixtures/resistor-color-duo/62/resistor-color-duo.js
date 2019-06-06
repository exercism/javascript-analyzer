export const COLORS = [
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

export const colorCode = color => COLORS.indexOf(color);

export const value = values =>
  Number(
    values.reduce(
      (accumulator, currentValue) => `${accumulator}${colorCode(currentValue)}`,
      ``
    )
  );
