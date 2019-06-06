const legend = {
  "black": 0,
  "brown": 1,
  "red": 2,
  "orange": 3,
  "yellow": 4,
  "green": 5,
  "blue": 6,
  "violet": 7,
  "grey": 8,
  "white": 9
}

let COLORS = Object.keys(legend)

let colorCode = (colorName) => legend[colorName]

export { COLORS, colorCode }