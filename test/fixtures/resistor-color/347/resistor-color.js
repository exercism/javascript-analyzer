const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

const colorCode = (colorName) => {
  const colorIndex = COLORS.indexOf(colorName.toLowerCase())
  return colorIndex > -1 ? colorIndex : new Error("Invalid Resistor Color")
}

export { colorCode, COLORS }
