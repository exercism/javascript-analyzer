export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

export const colorCode = (color) => {
  return COLORS.indexOf(color);
}

export const decodedValue = (colors) => {
  return Number(`${colorCode(colors[0])}${colorCode(colors[1])}`)
}
