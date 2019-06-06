const COLORS = {
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

function value(duo) {
    const value = duo.map(color => COLORS[color]).join('')
    return parseInt(value)
}

export { value }