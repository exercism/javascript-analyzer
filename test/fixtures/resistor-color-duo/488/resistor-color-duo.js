/**
 * module resistor-color-duo provides helpful function to handle with
 * Raspiberry PI resistors.
 */
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
];

/**
 * Calculate the decodedValue of the band from two resistor colors
 *
 * @param {string[]} colors - A list of resistor colors
 * @returns {number} The decodedValue of the band
 *
 * @example
 *  decodedValue(["brown", "black"]) #=> 10
 */
export function decodedValue(colors) {
  return Number.parseInt(
    colors.reduce((result, color) => result + COLORS.indexOf(color), ""),
    10
  );
}
