const resistorColors = [
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
let value = ([color1, color2]) => {
  let colorIndex1 = resistorColors.indexOf(color1)
  let colorIndex2 = resistorColors.indexOf(color2)
  // concatenates the array indices as a string
  let resistorCodes = `${colorIndex1}${colorIndex2}`
  // converts string to a number
  return Number(resistorCodes)
}

export { value, resistorColors }
