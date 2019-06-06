const value = colors => {
  const [decimalColor, unitColor] = colors
  const decimal = getColorNumber(decimalColor)
  const unit = getColorNumber(unitColor)

  return Number(`${decimal}${unit}`)
}

const getColorNumber = color => bandColors.indexOf(color.toLowerCase())

const bandColors = [
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

export { value }
