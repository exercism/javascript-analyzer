
export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

export function decodedValue(color){
  let returnColor1 = color[0].toLowerCase();
  let returnColor2 = color[1].toLowerCase();
  let string = (COLORS.indexOf(returnColor1).toString()) + (COLORS.indexOf(returnColor2).toString());
  return Number(string);
}
