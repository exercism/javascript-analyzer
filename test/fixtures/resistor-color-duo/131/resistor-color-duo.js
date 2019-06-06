const resistorColors = [
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

export let value = ([one, two]) =>
  Number("" + resistorColors.indexOf(one) + resistorColors.indexOf(two));
