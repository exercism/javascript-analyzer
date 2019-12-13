const COLOR_CODES = {
    black: 0,
    brown: 1,
    red: 2,
    orange: 3,
    yellow: 4,
    green: 5,
    blue: 6,
    violet: 7,
    grey: 8,
    white: 9,
};

export function decodedValue(colors)
{
    return colors.map(color => COLOR_CODES[color]).reduce((acc, digit) => acc * 10 + digit);
}
