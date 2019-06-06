/**
 * Resistor Color Duo
 *
 * A program will take two colors as input, and output the correct number.
 */

const COLORS = new Map()
    .set('black', '0')
    .set('brown', '1')
    .set('red', '2')
    .set('orange', '3')
    .set('yellow', '4')
    .set('green', '5')
    .set('blue', '6')
    .set('violet', '7')
    .set('grey', '8')
    .set('white', '9');

/**
 * Function to return concatenation of values of given array of colors.
 *
 * @param {string[]} inputColors - Array of band colors to be input
 * @return {number} The concatenation of string numbers representing resistor band values
 **/
export const value = (inputColors) => {
    return parseInt(inputColors.reduce((colorA, colorB) => COLORS.get(colorA.toLowerCase()) + COLORS.get(colorB.toLowerCase())));
};