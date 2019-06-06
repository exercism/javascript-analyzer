export const value = (bands) => {
    let numbers = [];
    bands.forEach((band) => {
        numbers.push(COLORS.indexOf(band));
    });

    return parseInt(numbers.join(''));
};

export const COLORS = [
    "black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"
];
