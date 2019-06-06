export const value = (arr) => {
    if (arr.length !== 2) {
        return -1;
    }
    return resistanceValues[arr[0]] * 10 + resistanceValues[arr[1]];
};


const resistanceValues = {
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
};
