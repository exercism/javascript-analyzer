const COLORS = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9
}

function value ([val1, val2]) {
  return Number.parseInt(
    `${COLORS[val1.toLowerCase()]}${COLORS[val2.toLowerCase()]}`
  )
}

export { value }
