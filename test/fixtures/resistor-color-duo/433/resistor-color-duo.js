const COLORS = [
  "black",  // 0
  "brown",  // 1
  "red",    // 2
  "orange", // 3
  "yellow", // 4
  "green",  // 5
  "blue",   // 6
  "violet", // 7
  "grey",   // 8
  "white"   // 9
]

// Transform color string into a code.
// Example:
// colorCode("yellow") // returns 4
const colorCode = color => COLORS.indexOf(color)

// Transform color codes into a number.
// Example:
// codesValue([1, 2, 3, 4]) // returns 1234
const codesValue = codes => Number(codes.join(""))

// Transform colors into a number that represents the colors.
// Example:
// decodedValue(["brown", "red", "orange", "yellow"]) // returns 1234
export const decodedValue = colors => {
  const colorCodes = colors.map(colorCode)
  return codesValue(colorCodes)
}
