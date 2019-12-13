export const decodedValue = cols => {
    const [first, second] = cols;

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
        white: 9,
    };

    let result = '';

    result += COLORS[first].toString();
    result += COLORS[second].toString();

    return parseInt(result);
};
