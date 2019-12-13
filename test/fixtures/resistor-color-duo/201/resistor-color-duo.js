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

const decode = (color) => {
  return COLORS.indexOf(color)
}

const decodedValue = (colors) => {
  return parseInt(`${decode(colors[0])}${decode(colors[1])}`)
}

export { decodedValue }
