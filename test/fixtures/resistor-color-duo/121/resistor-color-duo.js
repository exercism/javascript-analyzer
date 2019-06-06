const COLORS = ['black', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'violet', 'grey', 'white']

export const value = colors => {
    return 10 * colorDigit(colors[0]) + colorDigit(colors[1])
}

const colorDigit = color => {
    return COLORS.indexOf(color)
}