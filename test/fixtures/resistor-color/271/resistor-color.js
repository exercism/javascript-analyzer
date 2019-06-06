export const COLORS = [
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

export const NON_EXISTENT_COLOR_CODE = -1

export const colorCode = name => {
  return COLORS.indexOf(name)
}
