const resistors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']

export const value = (colors) => Number(`${resistors.indexOf(colors[0])}${resistors.indexOf(colors[1])}`)