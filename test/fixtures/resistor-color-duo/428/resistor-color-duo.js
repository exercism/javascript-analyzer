const COLORS = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white'
]

export function decodedValue (colors) {
  const decodedValue = colors.map(function(color) {
    return COLORS.indexOf(color)
  })
  return Number(decodedValue.join(''));
}
