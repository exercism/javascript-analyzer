export const COLORS = [
  'black', 'brown', 'red', 'orange', 'yellow', 'green',
  'blue', 'violet', 'grey', 'white',
]

// Making the "reducing" and exponentiation, with acc, color and iValue to match toEqual(xx)

const reducer = (accumulator, color, iValue) => accumulator + COLORS.indexOf(color) * (10 ** iValue)

export const value = colors => colors.reverse().reduce(reducer, 0)