export const COLORS = [
    "black",
    "brown",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "violet",
    "grey",
    "white"
]

export const value = colors => {
  return colors.reverse().reduce((acc, color, i) => {
    return acc += COLORS.indexOf(color) * ( 10**i )
  }, 0)
}
