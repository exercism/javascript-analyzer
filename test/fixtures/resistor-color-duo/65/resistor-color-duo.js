const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

function colorCode (color) {
  return COLORS.indexOf(color)
}

export function value (colors) {
  const values = colors.map(color => colorCode(color))
  const value = values.reduce((acc, value) => acc + String(value))
  return Number(value)
}
