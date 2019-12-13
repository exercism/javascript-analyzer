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

const decodedValue = ([first, second]) => {
  const response = `${COLORS.indexOf(first)}${COLORS.indexOf(second)}`
  return Number(response)
}

module.exports = {decodedValue};
