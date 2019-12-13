export let COLORS = [
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
]

export const decodedValue = (a,b) => {
  const val1 = COLORS.indexOf(a);
  const val2 = COLORS.indexOf(b);

  return `${val1}${val2}`;
}
