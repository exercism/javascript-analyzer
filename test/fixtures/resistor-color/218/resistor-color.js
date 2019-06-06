
export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

export function colorCode(color){
  var returnColor = color.toLowerCase();
  return COLORS.indexOf(returnColor);

}