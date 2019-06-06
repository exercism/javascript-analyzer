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
]

export const value = (arrColors) =>{
  var result = "";
  arrColors.forEach(color => {
    result += COLORS.indexOf(color);
  });
  return Number.parseInt(result);

}