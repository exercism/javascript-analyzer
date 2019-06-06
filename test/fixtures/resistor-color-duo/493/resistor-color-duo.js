let valueColors = {
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

export const value = (colors) => {
    return colors.reduce((acc, cv) => (valueColors[acc] * 10) + valueColors[cv]);
};