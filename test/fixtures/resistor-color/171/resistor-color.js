/**
 * Resistor Color
 *
 * Resistors have color coded bands, where each color maps to a number.
 * The first 2 bands of a resistor have a simple encoding scheme: each color maps to a single number.
 */

export const COLORS = ["black", "brown", "red", "orange", "yellow", "green", "blue", "violet", "grey", "white"];

/**
 * Function to return a color code given a color.
 */
export const colorCode = (color) => {
    return COLORS.indexOf(color);
};