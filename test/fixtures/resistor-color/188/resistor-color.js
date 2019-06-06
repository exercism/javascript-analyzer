export const COLORS = [
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

const colorsMap = {
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

export const colorCode = colors => {
  let result = []
  if (Array.isArray(colors)) {
    colors.forEach(color => {
      if (color in colorsMap) {
        return colorsMap[color]
      } else {
        return `color '${color}' code number couldn't be found`
      }
    })
    return result
  } else if (typeof colors === 'string') {
    if (colors in colorsMap) {
      return colorsMap[colors]
    } else {
      return `color '${color}' code number couldn't be found`
    }
  } else {
    return 'wrong input type'
  }
}
