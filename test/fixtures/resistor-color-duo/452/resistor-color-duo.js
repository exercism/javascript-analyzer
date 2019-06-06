const COLORS = ['black', 'brown', 'red', 'orange', 'yellow',
                'green', 'blue', 'violet', 'grey', 'white']

export const value = colors => {
  return Number(colors.reduce((value, color) => value += COLORS.indexOf(color), ''))
}
