const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']
export const decodedValue = (list) => list.reduce((acc, decodedValue) => parseInt(acc + COLORS.indexOf(decodedValue).toString()), '')
