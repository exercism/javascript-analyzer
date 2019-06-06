let getColourCodeValue = (colour) => {
    let resistorValues = {
        "black": 0,
        "brown": 1,
        "red": 2,
        "orange": 3,
        "yellow": 4,
        "green": 5,
        "blue": 6,
        "violet": 7,
        "grey": 8,
        "white": 9
    };

    return resistorValues[colour];
};

let combinedColourValue = (arrayOfColours) => {
    let colour1 = getColourCodeValue(arrayOfColours[0]).toString();
    let colour2 = getColourCodeValue(arrayOfColours[1]).toString();

    let combinedValue = colour1 + colour2;

    return parseInt(combinedValue);
};

module.exports = {
    value: combinedColourValue,
};