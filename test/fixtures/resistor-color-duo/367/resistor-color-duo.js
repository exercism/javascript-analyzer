const VALUES = {
    black: "0",
    brown: "1",
    red: "2",
    orange: "3",
    yellow: "4",
    green: "5",
    blue: "6",
    violet: "7",
    grey: "8",
    white: "9"
};

export const decodedValue = colors => {
    return parseInt(VALUES[colors[0]] + VALUES[colors[1]]);
};
