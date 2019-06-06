const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"]

const colorCode = (colorSelected) => COLORS.findIndex(color => color === colorSelected)

module.exports = {
  COLORS,
  colorCode
}