const COLORS = [ "black","brown","red","orange","yellow","green","blue","violet","grey","white" ]

function colorCode(color) {
  return COLORS.indexOf(color)
}

module.exports = {
  COLORS,
  colorCode
}