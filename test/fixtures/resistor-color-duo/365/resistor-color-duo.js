const COLORS = [
    "black",
    "brown",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "violet",
    "grey",
    "white"
]

let colorToDigit = (inputColor) => {
    let resultDigit = COLORS.indexOf(inputColor.toLowerCase());

    if(resultDigit < 0)
        throw "color is not used";

    return resultDigit;
}

let value = (duoColors = []) => {
    if (duoColors.length != 2)
        throw "must supply exactly two colors";

    return duoColors
        .map(colorToDigit)
        .reduce(
            (sum, colorDigit, index) =>  
                sum +
                Math.pow(10, (duoColors.length - index - 1)) *
                colorDigit,
            0);
}

export {value};