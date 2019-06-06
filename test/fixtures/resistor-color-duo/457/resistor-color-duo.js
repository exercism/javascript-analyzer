const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']

function value(colors) {
  return colors.reverse().reduce(
    ([sum, factor], color) => {
      return [sum + COLORS.indexOf(color) * factor, factor * 10]
    },
    [0, 1]
  )[0]
}

export { value }
