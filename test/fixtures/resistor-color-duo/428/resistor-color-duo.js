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

export function value (colors) {
  const value = colors.map(function(color) {
    return COLORS.indexOf(color)
  })
  return Number(value.join(''));
}
