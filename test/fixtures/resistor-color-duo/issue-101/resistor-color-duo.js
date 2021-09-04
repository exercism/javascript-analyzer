export const decodedValue = (colors) => {
  let indices = colors.map(colorCode)
  let result = "" + indices[0] + indices[1]
  return Number(result)
}
const colorCode = (color) => {
  return COLORS.indexOf(color)
}
export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "White"]