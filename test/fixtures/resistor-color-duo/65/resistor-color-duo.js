const COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"]

function colorCode (color) {
  return COLORS.indexOf(color)
}

export function decodedValue (colors) {
  const values = colors.map(color => colorCode(color))
  const decodedValue = values.reduce((acc, decodedValue) => acc + String(decodedValue))
  return Number(decodedValue)
}
