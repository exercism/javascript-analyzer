export const value = colours => {
  const arr = [
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

  const colourOne = arr.indexOf(colours[0]).toString();
  const colourTwo = arr.indexOf(colours[1]).toString();
  const result = colourOne + colourTwo;

  return parseInt(result);
};
