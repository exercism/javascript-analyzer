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

const value = ([name1, name2]) => {
  COLOR.indexOf(name1) + COLOR.indexOf(name2);
};

console.log(value(["red", "blue"]));
export { value };
