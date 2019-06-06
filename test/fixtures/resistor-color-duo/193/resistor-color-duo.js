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
  'white',
]

const colorCode = (color) => COLORS.findIndex(element => element === color)

const reduceToDecimal = (acc, cur, idx) => acc + cur * Math.pow(10, idx)

const arrayToDecimal = (array) => array.reverse().reduceRight(reduceToDecimal, 0)

export const value = (colors) => arrayToDecimal(colors.map(colorCode))
