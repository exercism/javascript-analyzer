const resistors = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']

export const decodedValue = (colors) => Number(`${resistors.indexOf(colors[0])}${resistors.indexOf(colors[1])}`)
