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

function decodedValue(colors) {
  return parseInt(
    colors
      .map(function mapColorToValue(color) {
        return COLORS.indexOf(color)
      })
      .join('')
  )
}

export { decodedValue }
