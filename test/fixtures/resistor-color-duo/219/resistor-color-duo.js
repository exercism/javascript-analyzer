const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']
export function decodedValue(resistorPair) {
  let resultStr = resistorPair.reduce((acc, resistor) => acc + COLORS.indexOf(resistor).toString(10), '')
  return Number.parseInt(resultStr, 10)
}
