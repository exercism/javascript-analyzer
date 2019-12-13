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
export function decodedValue(asd) {
  var num = "";
  asd.forEach(function(ele) {
    num += (COLORS.indexOf(ele)).toString();
  });
  return Number(num);
}
