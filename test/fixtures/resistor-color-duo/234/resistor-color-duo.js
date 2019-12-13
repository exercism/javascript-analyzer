const COLOR = [
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

const decodedValue = ([name1, name2]) => {
  COLOR.indexOf(name1) + COLOR.indexOf(name2);
};

console.log(decodedValue(["red", "blue"]));
export { decodedValue };
