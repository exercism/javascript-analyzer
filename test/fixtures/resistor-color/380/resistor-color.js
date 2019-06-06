export const colorCode = color => {
  return COLORS.findIndex(resistor => resistor === color.toLowerCase())
}

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
  "white",
]
