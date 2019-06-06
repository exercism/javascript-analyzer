const COLORS = [ "black","brown","red","orange","yellow",
"green","blue","violet","grey","white" ]

const value = (colors) => {
  let value = ''
  colors.forEach((color) => value += COLORS.indexOf(color))
  return Number(value)
}

module.exports = {
  value,
  COLORS
}