const COLORS = ['black', 'brown', 'red', 'orange', 'yellow' ,'green', 'blue', 'violet', 'grey', 'white']
const value = (color) => {
  if (Array.isArray(color)) {
    return Number(`${COLORS.indexOf(color[0])}${COLORS.indexOf(color[1])}`)
  } else {
    return false
  }
}

export {value}