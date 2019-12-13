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

export const decodedValue = (inputColors) => {
  return Number(
          COLORS.indexOf(inputColors[0])
          + '' +
          COLORS.indexOf(inputColors[1]));
}
