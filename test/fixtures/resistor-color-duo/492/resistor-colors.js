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
export function value(asd) {
  var num = "";
  asd.forEach(function(ele) {
    num += (COLORS.indexOf(ele)).toString();
  });
  return Number(num);
}
