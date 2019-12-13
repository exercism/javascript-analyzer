const COLORS = [ "black","brown","red","orange","yellow",
"green","blue","violet","grey","white" ]

const decodedValue = (colors) => {
  let decodedValue = ''
  colors.forEach((color) => decodedValue += COLORS.indexOf(color))
  return Number(decodedValue)
}

module.exports = {
  decodedValue,
  COLORS
}
