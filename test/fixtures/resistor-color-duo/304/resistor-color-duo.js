const resistorColors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']

export const decodedValue = (colors) => {
  let a = resistorColors.indexOf(colors[0]);
  let b = resistorColors.indexOf(colors[1]);
  return parseInt(a + '' + b)
}
