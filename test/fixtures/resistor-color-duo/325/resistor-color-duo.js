export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

export const value = (colorSet) => {
  let stringOut = COLORS.indexOf(colorSet[0]).toString() + COLORS.indexOf(colorSet[1]).toString()
  return parseInt(stringOut)
}