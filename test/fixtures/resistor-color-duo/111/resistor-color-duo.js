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

function value(colors) {
  return parseInt(
    colors
      .map(function mapColorToValue(color) {
        return COLORS.indexOf(color)
      })
      .join('')
  )
}

export { value }
